---
version: 1.0.0
name: find-skills
description: Helps users discover and install agent skills when they ask questions like "how do I do X", "find a skill for X", "is there a skill that can...", or express interest in extending capabilities. This skill should be used when the user is looking for functionality that might exist as an installable skill.
---

# 🔍 Skill Finder & Installer

Этот скилл — твой навигатор по глобальному репозиторию скиллов.

## 🎯 Цель
Автоматически подбирать и устанавливать нужные компетенции в проект, чтобы ИИ работал на максимум возможностей.

## 🛠️ Алгоритм
1. **Поиск**: Сканировать директорию `/Users/alex/Downloads/_GLOBAL_AI_SKILLS/`.
2. **Анализ**: Сопоставить текущую задачу пользователя с описаниями (description) в SKILL.md каждого глобального скилла.
3. **Установка**: Если найден подходящий скилл, которого нет в текущем проекте (`.agent/skills/`) — скопировать его туда.
4. **Активация**: Прочитать инструкцию установленного скилла и применить её к задаче.

## 📁 Путь к репозиторию
`/Users/alex/Downloads/_GLOBAL_AI_SKILLS/`
