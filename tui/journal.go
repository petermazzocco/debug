package tui

import (
	"debug-cli/entries"
	"fmt"
	"strings"
	"time"

	"github.com/charmbracelet/bubbles/textarea"
	tea "github.com/charmbracelet/bubbletea"
	"github.com/charmbracelet/lipgloss"
	"github.com/charmbracelet/x/term"
)

// App states
const (
	stateMenu int = iota
	stateWriting
)

// Styling with lipgloss
var (
	// Define colors
	subtle    = lipgloss.AdaptiveColor{Light: "#D9DCCF", Dark: "#383838"}
	highlight = lipgloss.AdaptiveColor{Light: "#874BFD", Dark: "#7D56F4"}
	// special   = lipgloss.AdaptiveColor{Light: "#43BF6D", Dark: "#73F59F"}

	// Journal title style
	titleStyle = lipgloss.NewStyle().
			Foreground(highlight).
			Bold(true).
			Padding(0, 1)

	// Border style for the text area
	textAreaStyle = lipgloss.NewStyle().
			Border(lipgloss.RoundedBorder()).
			BorderForeground(highlight).
			Padding(1).
			Width(80).
			Height(20)
)

type model struct {
	state        int
	choices      []string
	cursor       int
	selected     map[int]struct{}
	textarea     textarea.Model
	content      string
	width        int
	height       int
	saveStatus   string
	saveStatusAt time.Time
}

// In your InitialModel function
func InitialModel() model {
	ta := textarea.New()
	ta.Placeholder = "Write your journal entry here..."
	ta.Focus()

	// Get initial terminal size
	width, height, _ := term.GetSize(0)

	// Adjust textarea size based on terminal
	ta.SetWidth(width - 10)   // Margins
	ta.SetHeight(height - 10) // Space for title and footer

	return model{
		state:        stateMenu,
		choices:      []string{"Basic journal entry", "Ask me a question", "Give me a prompt"},
		cursor:       0,
		selected:     make(map[int]struct{}),
		textarea:     ta,
		content:      "",
		width:        width,
		height:       height,
		saveStatus:   "",
		saveStatusAt: time.Time{},
	}
}

func (m model) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
	var cmd tea.Cmd

	switch msg := msg.(type) {
	case tea.WindowSizeMsg:
		m.width = msg.Width
		m.height = msg.Height

		// Update textarea dimensions
		m.textarea.SetWidth(msg.Width - 10)
		m.textarea.SetHeight(msg.Height - 10)
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

			case "ctrl+f":
				// Get the content of the textarea
				content := m.textarea.Value()
				// Save content to the system locally
				err := entries.SaveEntryToFile(content)
				if err != nil {
					m.saveStatus = fmt.Sprintf("Error saving: %v", err.Error())
				} else {
					m.saveStatus = "Journal entry was saved locally!"
				}

				m.saveStatusAt = time.Now()

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
		// Style your menu items
		title := titleStyle.Render("Journal Entry Options")

		// Create a styled list of choices
		var menuItems []string
		for i, choice := range m.choices {
			cursor := " "
			if m.cursor == i {
				cursor = ">"
			}

			item := fmt.Sprintf("%s %s", cursor, choice)
			if m.cursor == i {
				// Highlight the selected item
				item = lipgloss.NewStyle().Foreground(highlight).Render(item)
			}
			menuItems = append(menuItems, item)
		}

		menu := lipgloss.JoinVertical(lipgloss.Left, menuItems...)
		footer := lipgloss.NewStyle().Foreground(subtle).Render("\nPress q to quit.")

		return lipgloss.JoinVertical(lipgloss.Left, title, "", menu, footer)
	} else {
		// Journal writing view with styled textarea
		journalTitle := titleStyle.Render("My Journal")

		// Apply border style to the textarea
		textAreaView := textAreaStyle.Render(m.textarea.View())

		// Status message
		statusMsg := ""

		if m.saveStatus != "" && time.Since(m.saveStatusAt) < 5*time.Second {
			if strings.HasPrefix(m.saveStatus, "Error") {
				statusMsg = lipgloss.NewStyle().
					Foreground(lipgloss.Color("#FF0000")).
					Render(m.saveStatus)
			} else {
				statusMsg = lipgloss.NewStyle().
					Foreground(lipgloss.Color("#00FF00")).
					Render(m.saveStatus)
			}
		}
		// Add styled instructions
		instructions := lipgloss.NewStyle().
			Foreground(subtle).
			Render("Press ESC to cancel, Ctrl+S to save, Crtl+F to finalize entry")

		return lipgloss.JoinVertical(lipgloss.Left,
			journalTitle,
			"",
			textAreaView,
			statusMsg,
			"",
			instructions)
	}
}

func (m model) Init() tea.Cmd {
	return tea.Batch(
		textarea.Blink,
		tea.EnterAltScreen,
	)
}
