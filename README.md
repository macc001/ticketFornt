# Clonando repositorio

---git config user
git config --global user.name "maagan"
---git config email
git config --global user.email maagansuarez9407@gmail.com

---para clonar un repositorio
`git clone` [repositorio](https://gitlab.com/macc001/angular-desde-cero.git)

--para agregar contribuidor nos dirigimos a setting luego a member y asigamos maintainer

---

    	git status
    	git add .
    	git status
    	git commit -m "commit2"
    	git push origin master

# Clonando repositorio

--

    	git remote -v
    	git remote add origin https://gitlab.com/macc001/angular-desde-cero.git
    	git remote -v

origin https://gitlab.com/macc001/angular-desde-cero.git (fetch)
origin https://gitlab.com/macc001/angular-desde-cero.git (push)

# Angulardesdecero

---cuando se clona de git, ejecutamos el siguiente comando
para instalar los paquetes de node_modules
npm install

---crear un proyecto en angular
ng new nombredel_proyecto

---para habrir en un puerto especifico
ng serve -o --port 5000

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
