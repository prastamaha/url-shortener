package utils

import "strings"

func SplitAndTrimByComma(input string) []string {
	if input == "" {
		return nil
	}
	parts := strings.Split(input, ",")
	for i, part := range parts {
		parts[i] = strings.TrimSpace(part)
	}
	return parts
}
