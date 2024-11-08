package docker.security

deny[msg] {
    input.Cmd == ["apt-get", "install", "sudo"]
    msg := "Avoid installing 'sudo' in Docker containers for security reasons."
}

deny[msg] {
    input.Env[_] == {"Name": "ROOT_PASSWORD", "Value": _}
    msg := "Avoid hardcoding sensitive environment variables like ROOT_PASSWORD."
}
