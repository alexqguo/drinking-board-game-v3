type Listener = () => void;

/**
 * A generic, observable key-value store.
 * T represents the interface of the items in the registry.
 */
export class GenericRegistry<T extends Record<string, any>> {
  private items: Partial<T>;
  private listeners: Set<Listener> = new Set();

  constructor(private defaultItems: T) {
    // Initialize with a shallow copy of default items
    this.items = { ...defaultItems };
  }

  /**
   * Registers or updates an item in the registry.
   */
  register<K extends keyof T>(itemName: K, itemImplementation: T[K]): void {
    this.items[itemName] = itemImplementation;
    this.notifyListeners();
  }

  /**
   * Unregisters an item, reverting to its default if one exists, or removing it if no default was provided.
   */
  unregister(itemName: keyof T): void {
    if (this.defaultItems.hasOwnProperty(itemName)) {
      this.items[itemName] = this.defaultItems[itemName]; // Revert to default
    } else {
      delete this.items[itemName];
    }
    this.notifyListeners();
  }

  /**
   * Retrieves a specific item from the registry.
   * If the item is not found or was unregistered without a default, it returns the default item.
   */
  getItem<K extends keyof T>(itemName: K): T[K] {
    // Fallback to default if the current item is undefined (e.g., after unregistering without a default)
    // Or if it was never registered and a default exists.
    return this.items[itemName] === undefined ? this.defaultItems[itemName] : this.items[itemName]!;
  }

  /**
   * Retrieves all items from the registry.
   * Returns a shallow copy, ensuring all keys from defaultItems are present, overlayed with current items.
   */
  getAllItems(): T {
    return { ...this.defaultItems, ...this.items } as T;
  }

  /**
   * Subscribes a listener function to be called on any change to the registry.
   * Returns an unsubscribe function.
   */
  subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach((listener) => listener());
  }
}
