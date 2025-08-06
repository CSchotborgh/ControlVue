/**
 * EDGERACK Cooling Unit Control System - Toast Notification System
 * 
 * Provides a comprehensive toast notification system for user feedback throughout
 * the cooling unit monitoring application. Manages notification state, timing,
 * and user interactions for system alerts, status updates, and error messages.
 */

import * as React from "react"

import type {
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast"

// Configuration constants for toast behavior
const TOAST_LIMIT = 1          // Maximum number of toasts shown simultaneously
const TOAST_REMOVE_DELAY = 1000000  // Delay before removing dismissed toasts (1000 seconds)

/**
 * Toast Data Structure
 * 
 * Extends the base ToastProps with additional fields for managing
 * toast lifecycle, content, and user interactions.
 */
type ToasterToast = ToastProps & {
  id: string                        // Unique identifier for the toast
  title?: React.ReactNode          // Optional toast title
  description?: React.ReactNode    // Optional toast description
  action?: ToastActionElement      // Optional action button
}

/**
 * Toast Action Types
 * 
 * Defines all possible actions that can be performed on the toast state.
 * Used for the reducer pattern to manage toast lifecycle consistently.
 */
const actionTypes = {
  ADD_TOAST: "ADD_TOAST",          // Add a new toast to the display
  UPDATE_TOAST: "UPDATE_TOAST",    // Update existing toast properties
  DISMISS_TOAST: "DISMISS_TOAST",  // Mark toast as dismissed (start fade out)
  REMOVE_TOAST: "REMOVE_TOAST",    // Remove toast from state completely
} as const

// Global counter for generating unique toast IDs
let count = 0

/**
 * Toast ID Generator
 * 
 * Generates unique string IDs for toast instances using a global counter.
 * Prevents overflow by wrapping at the maximum safe integer value.
 * 
 * @returns Unique string ID for a new toast
 */
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

type ActionType = typeof actionTypes

type Action =
  | {
      type: ActionType["ADD_TOAST"]
      toast: ToasterToast
    }
  | {
      type: ActionType["UPDATE_TOAST"]
      toast: Partial<ToasterToast>
    }
  | {
      type: ActionType["DISMISS_TOAST"]
      toastId?: ToasterToast["id"]
    }
  | {
      type: ActionType["REMOVE_TOAST"]
      toastId?: ToasterToast["id"]
    }

interface State {
  toasts: ToasterToast[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case "DISMISS_TOAST": {
      const { toastId } = action

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      }
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

const listeners: Array<(state: State) => void> = []

let memoryState: State = { toasts: [] }

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

type Toast = Omit<ToasterToast, "id">

function toast({ ...props }: Toast) {
  const id = genId()

  const update = (props: ToasterToast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    })
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss()
      },
    },
  })

  return {
    id: id,
    dismiss,
    update,
  }
}

/**
 * Toast Hook
 * 
 * React hook that provides access to the toast system state and functions.
 * Automatically syncs with the global toast state and provides methods
 * for creating and dismissing notifications throughout the application.
 * 
 * @returns Object containing current toasts, toast function, and dismiss function
 * 
 * @example
 * const { toast, dismiss } = useToast();
 * 
 * // Show success message
 * toast({
 *   title: "Settings Updated",
 *   description: "Cooling unit configuration saved successfully",
 * });
 * 
 * // Show error message
 * toast({
 *   title: "Connection Error", 
 *   description: "Unable to connect to cooling unit",
 *   variant: "destructive",
 * });
 */
function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    // Subscribe to global state changes
    listeners.push(setState)
    
    // Cleanup subscription on unmount
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    ...state,
    toast,  // Function to create new toasts
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  }
}

// Export the hook and toast function for use throughout the application
export { useToast, toast }
