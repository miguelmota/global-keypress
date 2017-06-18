#include <stdio.h>
#include <time.h>
#include <string.h>
#include <ApplicationServices/ApplicationServices.h>
#include <Carbon/Carbon.h>

// The following method converts the key code returned by each keypress as
// a human readable key code in const char format.
const char *convertKeyCode(int keyCode) {
    switch ((int) keyCode) {
        case 0:   return "a";
        case 1:   return "s";
        case 2:   return "d";
        case 3:   return "f";
        case 4:   return "h";
        case 5:   return "g";
        case 6:   return "z";
        case 7:   return "x";
        case 8:   return "c";
        case 9:   return "v";
        case 11:  return "b";
        case 12:  return "q";
        case 13:  return "w";
        case 14:  return "e";
        case 15:  return "r";
        case 16:  return "y";
        case 17:  return "t";
        case 18:  return "1";
        case 19:  return "2";
        case 20:  return "3";
        case 21:  return "4";
        case 22:  return "6";
        case 23:  return "5";
        case 24:  return "=";
        case 25:  return "9";
        case 26:  return "7";
        case 27:  return "-";
        case 28:  return "8";
        case 29:  return "0";
        case 30:  return "]";
        case 31:  return "o";
        case 32:  return "u";
        case 33:  return "[";
        case 34:  return "i";
        case 35:  return "p";
        case 37:  return "l";
        case 38:  return "j";
        case 39:  return "'";
        case 40:  return "k";
        case 41:  return ";";
        case 42:  return "\\";
        case 43:  return ",";
        case 44:  return "/";
        case 45:  return "n";
        case 46:  return "m";
        case 47:  return ".";
        case 50:  return "`";
        case 65:  return "<KP.>";
        case 67:  return "<KP*>";
        case 69:  return "<KP+>";
        case 71:  return "<Clear>";
        case 75:  return "<KP/>";
        case 76:  return "<KP_Enter>";
        case 78:  return "<KP->";
        case 81:  return "<KP=>";
        case 82:  return "<KP0>";
        case 83:  return "<KP1>";
        case 84:  return "<KP2>";
        case 85:  return "<KP3>";
        case 86:  return "<KP4>";
        case 87:  return "<KP5>";
        case 88:  return "<KP6>";
        case 89:  return "<KP7>";
        case 91:  return "<KP8>";
        case 92:  return "<KP9>";
        case 36:  return "<Enter>";
        case 48:  return "<Tab>";
        case 49:  return "<Space>";
        case 51:  return "<Delete>";
        case 53:  return "<ESC>";
        case 54:  return "<RCommand>";
        case 55:  return "<LCommand>";
        case 56:  return "<LShift>";
        case 57:  return "<CapsLock>";
        case 58:  return "<LOption>";
        case 59:  return "<LCtrl>";
        case 60:  return "<RShift>";
        case 61:  return "<ROption>";
        case 62:  return "<RCtrl>";
        case 63:  return "<FN>";
        case 64:  return "<F17>";
        case 72:  return "<VolumeUp>";
        case 73:  return "<VolumeDown>";
        case 74:  return "<Mute>";
        case 79:  return "<F18>";
        case 80:  return "<F19>";
        case 90:  return "<F20>";
        case 96:  return "<F5>";
        case 97:  return "<F6>";
        case 98:  return "<F7>";
        case 99:  return "<F3>";
        case 100: return "<F8>";
        case 101: return "<F9>";
        case 103: return "<F11>";
        case 105: return "<F13>";
        case 106: return "<F16>";
        case 107: return "<F14>";
        case 109: return "<F10>";
        case 111: return "<F12>";
        case 113: return "<F15>";
        case 114: return "<Help>";
        case 115: return "<Home>";
        case 116: return "<PageUp>";
        case 117: return "<FwdDel>";
        case 118: return "<F4>";
        case 119: return "<End>";
        case 120: return "<F2>";
        case 121: return "<PageDown>";
        case 122: return "<F1>";
        case 123: return "<Left>";
        case 124: return "<Right>";
        case 125: return "<Down>";
        case 126: return "<Up>";
    }
    return "<UNKNOWN_KEY>";
}

const char *convertShiftKeyCode(int keyCode) {
    switch ((int) keyCode) {
        case 0:   return "A";
        case 1:   return "S";
        case 2:   return "D";
        case 3:   return "F";
        case 4:   return "H";
        case 5:   return "G";
        case 6:   return "Z";
        case 7:   return "X";
        case 8:   return "C";
        case 9:   return "V";
        case 11:  return "B";
        case 12:  return "Q";
        case 13:  return "W";
        case 14:  return "E";
        case 15:  return "R";
        case 16:  return "Y";
        case 17:  return "T";
        case 18:  return "!";
        case 19:  return "@";
        case 20:  return "#";
        case 21:  return "$";
        case 22:  return "^";
        case 23:  return "%";
        case 24:  return "+";
        case 25:  return "(";
        case 26:  return "&";
        case 27:  return "_";
        case 28:  return "*";
        case 29:  return ")";
        case 30:  return "}";
        case 31:  return "O";
        case 32:  return "U";
        case 33:  return "{";
        case 34:  return "I";
        case 35:  return "P";
        case 37:  return "L";
        case 38:  return "J";
        case 39:  return "\"";
        case 40:  return "K";
        case 41:  return ":";
        case 42:  return "|";
        case 43:  return "<";
        case 44:  return "?";
        case 45:  return "N";
        case 46:  return "M";
        case 47:  return ">";
        case 50:  return "~";
        case 65:  return "<KP.>";
        case 67:  return "<KP*>";
        case 69:  return "<KP+>";
        case 71:  return "<Clear>";
        case 75:  return "<KP/>";
        case 76:  return "<KP_Enter>";
        case 78:  return "<KP->";
        case 81:  return "<KP=>";
        case 82:  return "<KP0>";
        case 83:  return "<KP1>";
        case 84:  return "<KP2>";
        case 85:  return "<KP3>";
        case 86:  return "<KP4>";
        case 87:  return "<KP5>";
        case 88:  return "<KP6>";
        case 89:  return "<KP7>";
        case 91:  return "<KP8>";
        case 92:  return "<KP9>";
        case 36:  return "<Enter>";
        case 48:  return "<Tab>";
        case 49:  return "<Space>";
        case 51:  return "<Delete>";
        case 53:  return "<ESC>";
        case 54:  return "<RCommand>";
        case 55:  return "<LCommand>";
        case 56:  return "<LShift>";
        case 57:  return "<CapsLock>";
        case 58:  return "<LOption>";
        case 59:  return "<LCtrl>";
        case 60:  return "<RShift>";
        case 61:  return "<ROption>";
        case 62:  return "<RCtrl>";
        case 63:  return "<FN>";
        case 64:  return "<F17>";
        case 72:  return "<VolumeUp>";
        case 73:  return "<VolumeDown>";
        case 74:  return "<Mute>";
        case 79:  return "<F18>";
        case 80:  return "<F19>";
        case 90:  return "<F20>";
        case 96:  return "<F5>";
        case 97:  return "<F6>";
        case 98:  return "<F7>";
        case 99:  return "<F3>";
        case 100: return "<F8>";
        case 101: return "<F9>";
        case 103: return "<F11>";
        case 105: return "<F13>";
        case 106: return "<F16>";
        case 107: return "<F14>";
        case 109: return "<F10>";
        case 111: return "<F12>";
        case 113: return "<F15>";
        case 114: return "<Help>";
        case 115: return "<Home>";
        case 116: return "<PageUp>";
        case 117: return "<FwdDel>";
        case 118: return "<F4>";
        case 119: return "<End>";
        case 120: return "<F2>";
        case 121: return "<PageDown>";
        case 122: return "<F1>";
        case 123: return "<Left>";
        case 124: return "<Right>";
        case 125: return "<Down>";
        case 126: return "<Up>";
    }
    return "<UNKNOWN_KEY>";
}

// TODO
// not use global
bool shiftKeyPressed = false;
bool controlKeyPressed = false;
bool optionKeyPressed = false;
bool commandKeyPressed = false;

// The following callback method is invoked on every keypress.
CGEventRef CGEventCallback(
      CGEventTapProxy proxy,
      CGEventType type,
      CGEventRef event,
      void *refcon) {

    if (type != kCGEventKeyDown &&
        type != kCGEventFlagsChanged &&
        type != kCGEventKeyUp) {
        return event;
    }

    // Retrieve the incoming keycode.
    CGKeyCode keyCode = (CGKeyCode) CGEventGetIntegerValueField(event, kCGKeyboardEventKeycode);

    uint8_t isShiftKey = (keyCode == 56 || keyCode == 60);
    uint8_t isControlKey = (keyCode == 59 || keyCode == 62);
    uint8_t isOptionKey = (keyCode == 58 || keyCode == 61);
    uint8_t isCommandKey = (keyCode == 54 || keyCode == 55);

    if (type == kCGEventFlagsChanged) {
      if (isShiftKey) {
        shiftKeyPressed = !shiftKeyPressed;
      }
      if (isControlKey) {
        controlKeyPressed = !controlKeyPressed;
      }
      if (isOptionKey) {
        optionKeyPressed = !optionKeyPressed;
      }
      if (isCommandKey) {
        commandKeyPressed = !commandKeyPressed;
      }
    }

    // Print the human readable key
    if (shiftKeyPressed && kCGEventKeyDown) {
      printf("%s\n", convertShiftKeyCode(keyCode));
    } else {
      if (type != kCGEventKeyUp) {
        if ((isShiftKey && !shiftKeyPressed) ||
            (isControlKey && !controlKeyPressed) ||
            (isOptionKey && !optionKeyPressed) ||
            (isCommandKey && !commandKeyPressed)) {
          printf("[released %s]\n", convertKeyCode(keyCode));
        } else if (!shiftKeyPressed) {
          printf("%s\n", convertKeyCode(keyCode));
        }
      }
    }

    fflush(stdout);

    return event;
}

int main(void) {
    // Create an event tap to retrieve keypresses.
    CGEventMask eventMask = (CGEventMaskBit(kCGEventKeyDown) | CGEventMaskBit(kCGEventFlagsChanged));

    CFMachPortRef eventTap = CGEventTapCreate(
        kCGSessionEventTap, kCGHeadInsertEventTap, 0, eventMask, CGEventCallback, NULL
    );

    // Exit the program if unable to create the event tap.
    if(!eventTap) {
        fprintf(stderr, "ERROR: Unable to create event tap.\n");
        exit(1);
    }

    // Create a run loop source and add enable the event tap.
    CFRunLoopSourceRef runLoopSource = CFMachPortCreateRunLoopSource(kCFAllocatorDefault, eventTap, 0);
    CFRunLoopAddSource(CFRunLoopGetCurrent(), runLoopSource, kCFRunLoopCommonModes);
    CGEventTapEnable(eventTap, true);

    CFRunLoopRun();

    //return 0;
}
