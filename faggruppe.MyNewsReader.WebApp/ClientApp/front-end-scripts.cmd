@ECHO OFF

:: This is a script manager for front-end installation, reinstallation, build and watch for changes.
:: Additional a feature for listing all versions related to front-end development.

ECHO.
ECHO *********************************************
ECHO * BEKK Forvaltning front-end script manager *
ECHO *********************************************
ECHO.

IF [%1]==[] CALL :DEFAULT_CASE
SET ACTION=%1
2>NUL CALL :CASE_%ACTION%
EXIT /B

:CASE_i
:CASE_install
  ECHO Installing front-end
  ECHO.
  CALL npm install
  CALL front-end-scripts build
  GOTO END_CASE
:CASE_r
:CASE_reinstall
  ECHO Reinstalling front-end
  ECHO Deleting existing files
  ECHO.
  rd /s /q .\node_modules
  CALL front-end-scripts install
  GOTO END_CASE
:CASE_b
:CASE_build
  ECHO Running one-time build
  ECHO.
  CALL npm run build
  GOTO END_CASE
:CASE_bp
:CASE_buildproduction
  ECHO Running one-time build
  ECHO.
  CALL npm run build
  GOTO END_CASE
:CASE_w
:CASE_start
  ECHO Starting server
  ECHO.
  CALL npm run start
  GOTO END_CASE
:CASE_v
:CASE_version
  ECHO Getting all front-end versions
  ECHO.

  ECHO npm
  CALL npm -v
  ECHO.

  ECHO npx (npm client tools)
  CALL npx -v
  ECHO.

  ECHO node.js
  CALL node -v
  ECHO.

  ECHO gulp
  CALL gulp -v
  ECHO.

  ECHO chocolatey
  CALL choco -v
  ECHO.

  ECHO yarn
  CALL yarn -v
  ECHO.

  GOTO END_CASE
:DEFAULT_CASE
  ECHO Action missing, valid actions are:
  ECHO  [i]nstall.
  ECHO  [r]einstall.
  ECHO  [b]uild.
  ECHO  [w]atch.
  ECHO  [v]version. Prints all front-end related versions
  GOTO END_CASE
:END_CASE
  GOTO :EOF
