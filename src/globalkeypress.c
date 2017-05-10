#include <stdio.h>
#include <ApplicationServices/ApplicationServices.h>

CGEventRef myCGEventCallback(
      CGEventTapProxy proxy,
      CGEventType type,
      CGEventRef event,
      void *refcon) {
  if ((type != kCGEventKeyDown) && (type != kCGEventKeyUp)) {
    return event;
  }

  CGKeyCode keycode = (CGKeyCode)CGEventGetIntegerValueField(
                        event,
                        kCGKeyboardEventKeycode);

  if (type == kCGEventKeyDown) {
    printf("%d\n", keycode);
    fflush(stdout);
  }

  return event;
}

int main(void) {
  CFMachPortRef eventTap;
  CGEventMask eventMask;
  CFRunLoopSourceRef runLoopSource;

  eventMask = ((1 << kCGEventKeyDown) | (1 << kCGEventKeyUp));
  eventTap = CGEventTapCreate(
        kCGSessionEventTap,
        kCGHeadInsertEventTap,
        0,
        eventMask,
        myCGEventCallback,
        NULL);

  if (!eventTap) {
    fprintf(stderr, "Can't create event handler. Try to run as root.\n");
    exit(1);
  }

  runLoopSource = CFMachPortCreateRunLoopSource(
                    kCFAllocatorDefault,
                    eventTap,
                    0);

  CFRunLoopAddSource(CFRunLoopGetCurrent(),
                     runLoopSource,
                     kCFRunLoopCommonModes);

  CGEventTapEnable(eventTap, true);
  CFRunLoopRun();

  //exit(0);
}
