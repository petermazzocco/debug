package entries

import (
	"fmt"
	"io/ioutil"
	"os"
	"os/user"
	"path/filepath"
	"strings"
	"time"
)

// SaveEntryToFile saves the journal entry as a markdown file with YAML front matter
func SaveEntryToFile(content string) error {
	// Get user's home directory
	currentUser, err := user.Current()
	if err != nil {
		return fmt.Errorf("couldn't get current user: %w", err)
	}

	// Create journal directory structure
	journalDir := filepath.Join(currentUser.HomeDir, ".journal", "entries")
	if err := os.MkdirAll(journalDir, 0755); err != nil {
		return fmt.Errorf("couldn't create journal directory: %w", err)
	}

	// Generate filename based on current time
	timestamp := time.Now()
	filename := filepath.Join(
		journalDir,
		fmt.Sprintf("%s.md", timestamp.Format("2006-01-02-150405")),
	)

	// Create YAML front matter
	frontMatter := strings.Join([]string{
		"---",
		fmt.Sprintf("timestamp: %s", timestamp.Format(time.RFC3339)),
		fmt.Sprintf("created: %s", timestamp.Format("January 2, 2006 3:04 PM")),
		"tags: []",
		"---",
		"",
		content,
	}, "\n")

	// Write content to a temporary file first (for atomic write)
	tempFilename := filename + ".tmp"
	if err := ioutil.WriteFile(tempFilename, []byte(frontMatter), 0644); err != nil {
		return fmt.Errorf("failed to write journal entry: %w", err)
	}

	// Rename the temporary file to the final filename (atomic operation)
	if err := os.Rename(tempFilename, filename); err != nil {
		return fmt.Errorf("failed to save journal entry: %w", err)
	}

	return nil
}
