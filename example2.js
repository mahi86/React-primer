function TodoList ({todos , onSetTodoStatus}) {
    const items = [];
  // for (let todo of props.todos) {
   //    items.push(<li key={todo.id}>{todo.text}</li>);
   // }
    //return (<ul> 
     //   <li> TODO List</li>
      //      {items}
       // </ul>
    //);
  // also make a note that we cannot add block scoping (if / when here) . so we have
    // to use ternary operator or fat arrows for this kind of  logic. 
    return (
        <ul>
            {todos.map(todo => 
                <li key={todo.id}>
                    <label>
                        <input checked={todo.isCompleted} type="checkbox" onChange={e=>onSetTodoStatus(todo , e.target.checked)}/>
                    {todo.isCompleted ? 
                        <del>{todo.text}</del> : todo.text}
                </label>
                </li> )}
        </ul>
    );
}
class TodoForm extends React.Component {
constructor(props) {
super(props);
this._onSubmit = this._onSubmit.bind(this);
}

render() {

return (
<form onSubmit={this._onSubmit}>
 <input type="text" ref={input => this._todoText = input}/>
 <button> Add To Do </button>
</form>

);

}

_onSubmit(e){
 e.preventDefault();
const todoText  = this._todoText.value.trim();
if(todoText.length == 0 ) {
return;
}
this._todoText.value = "";
this.props.onAddTodo(todoText);
}

}

TodoForm.propTypes = {
 onAddTodo : React.PropTypes.func.isRequired
};




class AppComponent extends React.Component {

constructor (props) {
    super(props);
    this._nextTodoId = 1;
    this.state = {
        filter : {showCompleted : true},
        todos : [
            {id: this._nextTodoId++ , text : "Hi" , isCompleted : false},
            {id: this._nextTodoId++ , text : "Hi1" , isCompleted : true},
            {id: this._nextTodoId++ , text : "Hi2" , isCompleted : true},
            {id: this._nextTodoId++ , text : "Hi3" , isCompleted : false}
            
        ]
    };
    this._onShowCompletedChanged = this._onShowCompletedChanged.bind(this);
    this._setTodoStatus = this._setTodoStatus.bind(this);
    this._addTodo = this._addTodo.bind(this);
}

componentDidMount() {
    this._todoForm._todoText.focus();
}
    render () {
        const{filter,todos} = this.state;
       const filteredTodos = filter.showCompleted 
        ? todos 
        : todos.filter(todo => !todo.isCompleted);
      
       return (
            <div>
                 <h2> Todolist </h2>
                 <label>
                     Show Completed 
                     <input type="checkbox" checked= {filter.showCompleted} onChange = {this._onShowCompletedChanged}/>
                     </label>
                     <TodoList todos={filteredTodos} onSetTodoStatus={this._setTodoStatus}/>
                     <TodoForm onAddTodo={this._addTodo} ref={form=>this._todoForm = form}/>
            </div>
        );
    }

    _addTodo(text) {
        
        this.setState({
            todos : this.state.todos.concat({
                id: this._nextTodoId++,
                text, isCompleted:false
            })

        });
            return;
    }
_setTodoStatus(todo , isCompleted) {
    const {todos} = this.state;
    //
    // Or can also write ; const newTodo = todos.map
    // then this.setstate({todos: newTodos})
    //

    this.setState({
    todos :  todos.map(oldTodo => {
        if(oldTodo.id != todo.id) {
            return oldTodo;
        }
        return Object.assign({} , oldTodo , {isCompleted    });
                })
            });

 //   this.setState({
  //      todos : todos.map(oldTodo => {
    //            if(oldTodo.id != todo.id) {
      //              return;
        //        } 
     //           return Object.assign({} , oldTodo , {isCompleted})
       // })
   // });
}

    _onShowCompletedChanged(e) {
        this.setState({filter : {showCompleted : e.target.checked}});
    }

}

ReactDOM.render(<AppComponent/> , document.getElementById("application"));