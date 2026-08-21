# Practica 2 - DevOps - Jenkins
echo # prueba pipeline funcionando >> README.md

**Estudiante:** Karen Gilces  
**Materia:** DevOps - ESPAM MFL - Tarea 3  
**Repo:** https://github.com/KarenGilces/practica2

## Objetivo
Levantar Jenkins en Docker con WSL2 y ejecutar un pipeline que identifique el commit actual.

## Requisitos cumplidos
- WSL 2.7.11.0 instalado
- Docker Desktop funcionando (Server Version 29.7.2)
- Volumen `jenkins_home` creado
- Jenkins corriendo en `http://localhost:8080`

## Como levantar Jenkins
```bash
docker volume create jenkins_home
docker run -d --name jenkins-lab -p 8080:8080 -p 50000:50000 -v jenkins_home:/var/jenkins_home jenkins/jenkins:lts-jdk21
docker logs jenkins-lab