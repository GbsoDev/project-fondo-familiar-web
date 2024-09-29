import { Usuario } from "../Modelos/Usuario";
import { GenericApiService } from "./GenericApiService";

export class UsuariosService extends GenericApiService<Usuario, string> {

  protected itemName(): string {
    return 'USUARIOS'
  }

  private datosIniciales: Usuario[] = [
    {
      nombre: "Juan Pérez",
      email: "jperez@mail.com",
      contrasenna: "12345"
    },
    {
      nombre: "Ana Gómez",
      email: "agomez@mail.com",
      contrasenna: "abcdef"
    }
  ];

  public async inicializarDatos(): Promise<void> {
      await this.listarUsuarios().then(usuarios => {
      if (usuarios.length === 0) {
        this.datosIniciales.map(async datoInicial => {
          await this.guardarUsuario(datoInicial);
        });
      }
    }).catch((error: Error) => {
      throw new Error(`Error al inicializar datos de usuarios: ${error.message}`);
    });
  }

  public listarUsuarios(): Promise<Usuario[]> {
    console.log('listarUsuarios');
    return super.listar();
  }

  public obtenerUsuario(id: string): Promise<Usuario> {
    return super.obtener(id);
  }

  public guardarUsuario(nuevoUsuario: Usuario): Promise<void> {
    return this.guardar(nuevoUsuario)
  }

  public actualizarUsuario(nuevoUsuario: Usuario): Promise<void> {
    return super.actualizar(nuevoUsuario);
  }

  public eliminarUsuario(id: string): Promise<void> {
    return super.eliminar(id);
  }
}
