package entries

import (
	"bufio"
	"fmt"
	"log"
	"os"
)

func CreateNewEntry() string {
	// Instantiate new reader
	reader := bufio.NewReader(os.Stdin)
	// Display prompt for user
	fmt.Print("What's on your mind?")

	// Read the string
	text, err := reader.ReadString('\n')
	if err != nil {
		log.Fatal(err.Error())
	}

	// Place text into database (to do)
	// For now just send back to print
	return text
}
