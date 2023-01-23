package handlers

import (
	"encoding/json"
	"net/http"
)

// ErrorResponse for returning error messages
type ErrorResponse struct {
	Message string `json:"message"`
	Code    int    `json:"code"`
}

func sendError(w http.ResponseWriter, message string, code int) {
	errorResponse := ErrorResponse{
		Message: message,
		Code:    code,
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	json.NewEncoder(w).Encode(errorResponse)
}
