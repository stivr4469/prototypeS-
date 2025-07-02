# Functions

## Function: processUserPrompt
```json
{
  "name": "processUserPrompt",
  "description": "Выполняет задание, строго следуя пользовательскому промпту без произвольных действий.",
  "parameters": {
    "type": "object",
    "properties": {
      "prompt": {
        "type": "string",
        "description": "Инструкция, содержащая полное описание задачи, которую нужно выполнить."
      }
    },
    "required": ["prompt"]
  }
}

