/*
Copyright © 2025 NAME HERE <EMAIL ADDRESS>
*/
package cmd

import (
	"debug-cli/tui"
	"fmt"
	"os"

	tea "github.com/charmbracelet/bubbletea"
	"github.com/spf13/cobra"
)

// entryCmd represents the entry command
var createCmd = &cobra.Command{
	Use:   "create",
	Short: "What's on your mind?",
	Long:  `Talk about what's bothering you, what's happening, or anything else!`,
	Args:  cobra.NoArgs,
	Run: func(cmd *cobra.Command, args []string) {
		// text := entries.CreateNewEntry()
		// fmt.Println("Your entry", text)
		p := tea.NewProgram(tui.InitialModel())
		if _, err := p.Run(); err != nil {
			fmt.Printf("Alas, there's been an error: %v", err)
			os.Exit(1)
		}
	},
}

func init() {
	rootCmd.AddCommand(createCmd)

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// entryCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// entryCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
