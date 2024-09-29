export class LocalStorageService<TItem> {

  private itemName: string;

  public constructor(itemName: string) {
    this.itemName = itemName;
  }

  public GuardarItem(newItem: TItem): void {
    const jsonItem = JSON.stringify(newItem);
    localStorage.setItem(this.itemName, jsonItem);
  }

  public ObtenerItem(): TItem | undefined {
    const jsonItem = localStorage.getItem(this.itemName);
    if (jsonItem === null) {
      console.warn(`El item ${this.itemName} no existe en local storage`);
      return undefined;
    }
    const item = JSON.parse(jsonItem);
    return item;
  }
}