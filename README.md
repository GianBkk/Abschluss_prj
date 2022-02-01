# Abschluss_prj

## Starten des Projekts

### Einrichtung Raspberry
https://www.heise.de/tipps-tricks/Raspberry-Pi-einrichten-so-klappt-s-4169757.html

### Erforderliche installationen am Raspberry
- Installiere git
´sudo apt install git´
- Installiere Docker das Docker script
´curl -fsSL https://get.docker.com -o get-docker.sh´
- Führe das script aus
´sudo sh get-docker.sh´
- Setze die rechte für Docker
´sudo usermod -aG docker [user_name]´
- Installiere Python da das docker-compose benötigt
´sudo apt-get install libffi-dev libssl-dev
sudo apt install python3-dev
sudo apt-get install -y python3 python3-pip´
- Installiere mittels pip docker-compose
´sudo pip3 install docker-compose´


### Hole den Code mit git
- Clone den Code
´´´git clone {github-link}´´´
- Pull den Code
Wenn man informationen am Code ändert möchte man den neusten stand haben
´git pull origin´

### Führe alles aus
Um den Code auszuführen gibt es ein script was es Automatisch macht.
Es startet die Applikationen und führt Migrationen aus.
´./scripts/start.sh´



## For testing
https://mockapi.io/projects/61f58cf962f1e300173c41ca