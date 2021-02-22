;AutoIt script to attach the files by handling the Open window.
;File paths are passed as command line parameters from selenium web driver.
;<Author KTP>

#include <Array.au3>
#include <WinAPIShPath.au3>

;Wait until Open window loads.. Waits for 60 seconds
 ;Local $hWnd = WinWait("Open", "", 15)
 Local $hWnd = WinWaitActive("Open", "", 60)
;WinActivate($hWnd)

Local $winPrcId = WinGetProcess($hWnd);
ConsoleWrite("Process id is " & $winPrcId);

 ;Check Winwait is succesful
 If($hWnd=0) Then
	ConsoleWriteError("Winwait is not successful ")
 Else
	ConsoleWrite("Winwait is successful " & $hWnd & " ")
 EndIf

;Set focus to edit box
Local $focusResult = ControlFocus("Open","","Edit1")

 ;Check Control Focus is succesful
 If($focusResult) Then
	ConsoleWrite("ControlFocus is successful ")
 Else
	ConsoleWriteError("ControlFocus is not successful ")
 EndIf

Sleep(5000)
;_ArrayDisplay($CmdLine, "1D display")

;Arranging the received command line arguments such that it can be used in edit box in Open window
Local $filePaths="";
For $i = 1 To $CmdLine[0]
    $filePaths = $filePaths & '"' & $CmdLine[$i] & '" '

Next

;MsgBox($MB_SYSTEMMODAL, "", $filePaths)

;Entering file path to the edit box
Local $setTextResult = ControlSetText("Open","","Edit1",$filePaths)
Sleep(5000)

 ;Check ControlSetText is succesful
 If($setTextResult) Then
	ConsoleWrite("ControlSetText is successful ")
 Else
	ConsoleWriteError("ControlSetText is not successful ")
 EndIf


;Validating whether the entered text in the edit box is as expected

; Retrieve the text of the edit control in Notepad. The handle returned by WinWait is used for the "title" parameter of ControlGetText.
Local $enteredText = ControlGetText("Open", "", "Edit1")

 ;Check the entered text is as expected
 If($enteredText==$filePaths) Then
	ConsoleWrite("Text entered is as expected ")
 Else
	ConsoleWriteError("Text entered is NOT as expected ")
 EndIf



;Click Open button
Local $clickResult = ControlClick("Open","","Button1")

 ;Check ControlSetText is succesful
 If($clickResult) Then
	ConsoleWrite("ControlClick is successful ")
 Else
	ConsoleWriteError("ControlClick is not successful ")
 EndIf

ConsoleWrite("This is test Message1");
;ConsoleWrite("This is test Message2");
Sleep(5000)