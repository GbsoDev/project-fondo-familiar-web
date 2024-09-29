import { LocalStorageService } from "./LocalStorageService";

export abstract class GenericApiService<TItem extends { id?: TId }, TId> {
  protected abstract itemName(): string;
  localStorageService = new LocalStorageService<TItem[]>(this.itemName());

  protected listar(): Promise<TItem[]> {
    return new Promise((resolve) => {
      const item = this.localStorageService.ObtenerItem() || new Array<TItem>();
      resolve(item);
    });
  }

  protected obtener(id: TId): Promise<TItem> {
    return new Promise((resolve, reject) => {
      const items = this.localStorageService.ObtenerItem() || new Array<TItem>();
      const item = items.find(usuario => usuario.id === id);
      if (item) {
        resolve(item)
      }
      else {
        reject(new Error(`Usuario con id ${id} no encontrado`));
      }
    });
  }

  protected generarGUID(): string {
    const s4 = (): string => {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    };
    return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
  }

  protected guardar(nuevoItem: TItem): Promise<void> {
    return new Promise((resolve, reject) => {
      if (nuevoItem) {
        const items = this.localStorageService.ObtenerItem() || new Array<TItem>();
        const nuevosItems = [...items, {...nuevoItem, id: this.generarGUID()}];
        this.localStorageService.GuardarItem(nuevosItems);
        resolve();
      }
      else {
        reject(new Error('Usuario requerido'));
      }
    });
  }

  protected actualizar(nuevoItem: TItem): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!nuevoItem) {
        reject(new Error('Usuario requerido'));
      }
      const items = this.localStorageService.ObtenerItem() || new Array<TItem>();
      const itemExite = items.find(item => item.id === nuevoItem.id);
      console.log(itemExite);
      if (!itemExite) {
        reject(new Error(`${this.itemName} no encontrado`));
      }
      const nuevosItems = items.map(item => item.id === nuevoItem.id ? nuevoItem : item);
      this.localStorageService.GuardarItem(nuevosItems);
      resolve();
    });
  }

  protected eliminar(id: TId): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!id) {
        reject(new Error('id requerido'));
      }
      const items = this.localStorageService.ObtenerItem() || new Array<TItem>();
      const itemExite = items.find(item => item.id === id);
      if (!itemExite) {
        reject(new Error(`${this.itemName} con id ${id} no encontrado`));
      }
      const newItems = items.filter(dbItem => dbItem !== itemExite);
      this.localStorageService.GuardarItem(newItems);
      resolve();
    });
  }
}
