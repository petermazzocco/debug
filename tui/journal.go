package tui

import (
	"fmt"

	"github.com/charmbracelet/bubbles/textarea"
	tea "github.com/charmbracelet/bubbletea"
)

// App states
const (
	stateMenu int = iota
	stateWriting
)

type model struct {
	state    int
	choices  []string
	cursor   int
	selected map[int]struct{}
	textarea textarea.Model
	content  string
}

func InitialModel() model {
	ta := textarea.New()
	ta.Placeholder = "Write your journal entry here..."
	ta.Focus()

	// Configure textarea
	ta.SetWidth(80)
	ta.SetHeight(20)
	ta.ShowLineNumbers = false

	return model{
		state:    stateMenu, // Start in menu state
		choices:  []string{"Basic journal entry", "Ask me a question", "Give me a prompt"},
		selected: make(map[int]struct{}),
		textarea: ta,
		content:  "",
	}
}

func (m model) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
	var cmd tea.Cmd

	switch msg := msg.(type) {
	case tea.KeyMsg:
		switch {
		// Global key handling
		case msg.String() == "ctrl+c":
			return m, tea.Quit

		// Menu state handling
		case m.state == stateMenu:
			switch msg.String() {
			case "q":
				return m, tea.Quit

			case "up", "k":
				if m.cursor > 0 {
					m.cursor--
				}

			case "down", "j":
				if m.cursor < len(m.choices)-1 {
					m.cursor++
				}

			case "enter", " ":
				// If "Basic journal entry" is selected (first option)
				if m.cursor == 0 {
					m.state = stateWriting
					cmd = textarea.Blink // Start textarea cursor blinking
				}
			}

		// Writing state handling
		case m.state == stateWriting:
			switch msg.String() {
			case "esc":
				// Exit back to menu without saving
				m.state = stateMenu

			case "ctrl+s":
				// Save the content
				m.content = m.textarea.Value()
				m.state = stateMenu

			default:
				// Handle text input
				var textareaCmd tea.Cmd
				m.textarea, textareaCmd = m.textarea.Update(msg)
				cmd = textareaCmd
			}
		}
	}

	return m, cmd
}

func (m model) View() string {
	if m.state == stateMenu {
		// Menu view
		s := "What type of entry do you want to create?\n\n"

		for i, choice := range m.choices {
			cursor := " "
			if m.cursor == i {
				cursor = ">"
			}

			checked := " "
			if _, ok := m.selected[i]; ok {
				checked = "x"
			}

			s += fmt.Sprintf("%s [%s] %s\n", cursor, checked, choice)
		}

		s += "\nPress q to quit.\n"
		return s
	} else {
		// Journal writing view
		return fmt.Sprintf(
			"# Journal Entry\n\n%s\n\nPress ESC to cancel, Ctrl+S to save\n",
			m.textarea.View(),
		)
	}
}

func (m model) Init() tea.Cmd {
	return textarea.Blink
}
