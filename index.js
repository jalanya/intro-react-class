// React - Class: Estado
class Toggle extends React.Component {
  constructor(props) {
    super();
    this.state = { activo: true };
  }
  handleClick(ev) {
    this.setState({
      activo: !this.state.activo
    });
  }
  render() {
    return React.createElement('div', {
      onClick: this.handleClick.bind(this)
    },
      'Activo: ',
      this.state.activo ? 'Si' : 'No'
    );
  }
}
/*
this.setState(nuevoEstado, function() {
  // Aqui this.state ya esta actualizado
});
// Aqui this.state no necesariamente esta
// actualizado
*/
//ReactDOM.render(<Toggle />, document.getElementById("content"));

// React - Estado - Desafio 1: Contador
/*
Contador
Crear un componente Contador, que cada vez que hace click en el botón,
incrementa la variable valor actual en uno.
*/
class Contador extends React.Component {
  constructor(props) {
    super(props);
    this.state = { valor: 1 };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ valor: this.state.valor + 1 })
  }

  render() {
    return React.createElement('div', null,
      React.createElement('div', null, this.state.valor),
      React.createElement('button', {
        onClick: this.handleClick
      }, 'Incrementar')
    )
  }
}

//ReactDOM.render(<Contador />, document.getElementById("content"));

// React - Estado - Desafio 2: Fecha Actual
/*
Modifiquemos el componente de forma tal que el render sea puro. Usa la propiedad fechaActual
del estado para mostrar la fecha y hora, y actualiza ese dato cada 1 segundo. Para lograrlo,
No olvides ponerle un valor inicial al estado
Utiliza el setInterval en el constructor para actualizar el estado con el nuevo valor.
Usa la nueva propiedad en el render
Tip
Usa new Date() para obtener el valor de fecha y hora actual.
*/
class FechaActual extends React.Component {
  constructor() {
    super();
    this.state = { fechaActual: new Date() };

    setInterval(function() {
      this.setState({ fechaActual: new Date() });
    }.bind(this), 1000)
  }

  render() {
    return React.createElement('div', null,
      'La fecha actual es: ',
      this.state.fechaActual.toString());
  }
}

//ReactDOM.render(<FechaActual />, document.getElementById("content"));

// React - Estado - Desafio 3: Resumen Listado
// https://codepen.io/jalanya/pen/VbYwNK
/*
https://www.acamica.com/clases/2566/introduccion-a-react/estado/desafio/1874
Desafío 3
Minimiza el estado de este componente y calcula todo lo posible en el render.
Tip
Pista: Presta atención a la información que puedes derivar de otra.
*/
class ResumenListado extends React.Component {
  constructor(props) {
    super(props);

    this.filtrosPosibles = {
      completos: function(item) { return item.completo; },
      borrados: function(item) { return item.borrado; },
    };
    this.state = {
      items: this.props.items,
      filtro: 'completos',
      cantidadFiltro: this.props.items.filter(this.filtrosPosibles.completos).length
    };
  }

  cambiarFiltro(nombreFiltro) {
    return function() {
      var filtro = this.filtrosPosibles[nombreFiltro];
      this.setState({
        filtro: nombreFiltro,
        cantidadFiltro: this.state.items.filter(filtro).length
      });
    }.bind(this);
  }

  render() {
    return React.createElement('div', null,
      'Tienes ',
      this.state.items.length,
      ' elementos y ',
      this.state.cantidadFiltro,
      ' filtrados.',
      React.createElement('button', { onClick: this.cambiarFiltro('completos') }, 'Cantidad completos'),
      React.createElement('button', { onClick: this.cambiarFiltro('borrados') }, 'Cantidad borrados')
    );
  }
}

var itemList = [
  {name: 'A', completo: true, borrado: false},
  {name: 'B', completo: true, borrado: false},
  {name: 'C', completo: true, borrado: false},
  {name: 'D', completo: false, borrado: false},
  {name: 'E', completo: false, borrado: true},
  {name: 'F', completo: false, borrado: true}
]

//ReactDOM.render(<ResumenListado items={itemList} />, document.getElementById("content"));

/*
Initial code
class ResumenListado extends React.Component {
  constructor() {
    super();

    this.filtrosPosibles = {
      completos: function(item) { return item.completo; },
      borrados: function(item) { return item.borrado; },
    };
    var filtro = this.filtrosPosibles.completos;
    this.state = {
      filtro: 'completos',
      cantidadFiltro: this.props.items.filter(filtro).length
    };
  }

  cambiarFiltro(nombreFiltro) {
    return function() {
      var filtro = this.filtrosPosibles[nombreFiltro];
      this.setState({
        filtro: nombreFiltro,
        cantidadFiltro: this.props.items.filter(filtro).length
      });
    }.bind(this);

  }

  render() {
    return React.createElement('div', null,
      'Tienes ',
      this.props.items.length,
      ' elementos y ',
      this.state.cantidadFiltro,
      ' filtrados.',
      React.createElement('button', { onClick: this.cambiarFiltro('completos') }, 'Cantidad completos'),
      React.createElement('button', { onClick: this.cambiarFiltro('borrados') }, 'Cantidad borrados')
    );
  }
}
*/

// React - Class: JSX
//1
var className='carousel';
var imagenes= [
  React.createElement('img', {key: 1, src: 'foto1.png'}),
  React.createElement('img', {key: 2, src: 'foto2.png'}),
  React.createElement('img', {key: 3, src: 'foto3.png'})
];

var el = React.createElement('div', {className: className }, imagenes);

//ReactDOM.render(el, document.getElementById("content"))
//2
var imagenes2 = [
  <img key={1} src="foto1.png" />,
  <img key={2} src="foto2.png" />,
  <img key={3} src="foto3.png" />
];

var el2 = <div className={className}>
  {imagenes2}
  </div>;

//ReactDOM.render(el2, document.getElementById("content"))

//3
/*
function Modal(props) {
  return(
    <div>hello</div>
  );
}
OR
*/
const Modal = function(props) {
  return(
    <div>Hello {props.children} {props.isOpen.toString()}</div>
  );
}

var el3 = React.createElement(Modal, { isOpen: true }, 'Contenido del modal!');

//ReactDOM.render(el3, document.getElementById("content"))

var el4 = <Modal isOpen={true}>
        Contenido del modal!
      </Modal>;

//ReactDOM.render(el4, document.getElementById("content"))

var el5 = <Modal isOpen>
        Contenido del modal!
      </Modal>;

//ReactDOM.render(el5, document.getElementById("content"));

// React - JSX - Desafio 1: Transforma este código a JSX
/*Transforma este código a JSX:
Tip
Pista: No olvides el elemento en la llamada a ReactDOM.render*/
/*
class App extends React.Component {
  render() {
    return React.createElement('div', { className: 'aplicacion' },
      'Hola mundo!',
      React.createElement('p', null,
        'Esto es un parrafo',
        React.createElement('a', { href: 'http://google.com' }, ' con un link')
      )
    );
  }
}
ReactDOM.render(React.createElement(App), document.getElementById('content'))
*/
class App extends React.Component {
  render() {
    return <div className={ 'application' }>Hola mundo!
            <p>Esto es un parrafo <a href={'https://google.com' }>con un link</a></p>
          </div>;
  }
}
//ReactDOM.render(React.createElement(App), document.getElementById('content'))
//ReactDOM.render(<App />, document.getElementById("content"))

// React - JSX - Desafio 2: Transforma este código de JSX a la api de Javascript
/*
var app2 = <ul className="menu">
  <li>Elemento 1</li>
  <li style={{ backgroundColor: 'red' }}>Elemento 2</li>
  <li style={{ backgroundColor: 'yellow' }}>Elemento 3</li>
  <li style={{ backgroundColor: 'blue' }}>Elemento 4</li>
 </ul>
*/

var app2 = React.createElement('ul', { className: 'menu'},
    React.createElement('li', null, 'Elemento 1'),
    React.createElement('li', { style: { backgroundColor: 'red' }}, 'Elemento 2'),
    React.createElement('li', { style: { backgroundColor: 'yellow' }}, 'Elemento 3'),
    React.createElement('li', { style: { backgroundColor: 'blue' }}, 'Elemento 4')
);

//ReactDOM.render(app2, document.getElementById("content"));

// React - JSX - Desafio 3: Transforma este codigo a JSX:
/*
Tip
Pista: recuerda que es equivalente a React.createElement(Componente)
siendo Componente una clase o cualquier variable que este en el scope.

Pista: Es importante la mayuscula, ya que con minuscula JSX entiende
que se intenta crear un elemento nativo.

class MenuItem extends React.Component {
  render() {
    var tipo = this.props.activo ? 'b' : 'span';
    return React.createElement('a', { href: this.props.href },
      React.createElement(tipo, null, this.props.titulo)
    );
  }
}
*/
class MenuItem extends React.Component {
  render() {
    var Tipo = this.props.activo ? 'b' : 'span';
    return <a href={ this.props.href }>
            <Tipo>{this.props.titulo}</Tipo>
           </a>;
  }
}

ReactDOM.render(<MenuItem titulo={ 'Titulo...' } activo={false} />,
                    document.getElementById("content"));
