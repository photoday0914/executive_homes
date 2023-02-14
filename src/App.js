/* src/App.js */
import React, { useEffect, useState } from 'react'
import { Amplify, API, graphqlOperation } from 'aws-amplify'
import { createTodo } from './graphql/mutations'
import { listTodos } from './graphql/queries'
import { withAuthenticator, Button, Heading, TextField, View, SelectField } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import { DataStore } from 'aws-amplify'
import { Todo } from './models'
import "react-table-filter/lib/styles.css"
import { library } from "@fortawesome/fontawesome-svg-core"
import {
  faFilter,
  faSort,
  faSortUp,
  faSortDown
} from "@fortawesome/free-solid-svg-icons"
import { HorizonTable } from "./components"
import awsExports from "./aws-exports"
Amplify.configure(awsExports)

library.add(faFilter, faSort, faSortUp, faSortDown);

const initialState = { name: '', description: '', finished: 'Finished', category: 'Software' }

const App = ({ signOut, user }) => {  

  const [formState, setFormState] = useState(initialState)
  const [todos, setTodos] = useState([])

  useEffect(() => {    
    fetchTodos()
    const subscription = DataStore.observe(Todo).subscribe(msg => {
      let newElement = {
        name : msg.element.name,
        description : msg.element.description,
        finished : msg.element.finished,
        category : msg.element.category
      }
      setTodos((todos) => [...todos, newElement])
    })
    return () => subscription.unsubscribe()    
  }, [])

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value })
  }

  async function fetchTodos() {
    try {      
      const todoData = await API.graphql(graphqlOperation(listTodos))
      const todos = todoData.data.listTodos.items
      setTodos(todos)
    } catch (err) { console.log('error fetching todos') }
  }

  async function addTodo() {
    try {
      if (!formState.name || !formState.description) return
      const todo = { ...formState }
      setFormState(initialState)
      await API.graphql(graphqlOperation(createTodo, {input: todo}))
    } catch (err) {
      console.log('error creating todo:', err)
    }
  }

  return (
    <>
      {/* Heading */}
      <div style={styles.header}>
        <Heading level={2} style={styles.heading}>{user.username}</Heading>
        <Button style={styles.button}onClick={signOut}>Sign out</Button>
      </div>

      {/* CreateTodo */}
      <View style={styles.container}>        
        <Heading level={2}>ExecutiveHomes</Heading>
        <TextField
          placeholder="Name"
          onChange={event => setInput('name', event.target.value)}
          style={styles.input}
          defaultValue={formState.name}
        />
        <TextField
          placeholder="Description"
          onChange={event => setInput('description', event.target.value)}
          style={styles.input}
          defaultValue={formState.description}
        />
        <SelectField
          label="Finished"
          onChange={event => setInput('finished', event.target.value)}
          style={styles.selectfield}
          defaultValue={formState.finished}
        >
          <option value='Finished'>Finished</option>
          <option value='Unfinished'>Unfinished</option>
        </SelectField>
        <SelectField
          label="Category"
          onChange={event => setInput('category', event.target.value)}
          style={styles.selectfield}
          defaultValue={formState.category}
        >
          <option value="Software">Software</option>
          <option value="Sport">Sport</option>
          <option value="Clothes">Clothes</option>
        </SelectField>
        <Button style={styles.button} onClick={addTodo}>Create Todo</Button>               
      </View>
      {/* Filter Table */}
      <div style={styles.table}>
        <HorizonTable
          columns={React.useMemo(
            () => [
              {
                Header: <span style={{ color: "white" }}>Name</span>,
                accessor: "name"
              },
              {
                Header: <span style={{ color: "white" }}>Description</span>,
                accessor: "description"
              },
              {
                Header: <span style={{ color: "white" }}>Finished</span>,
                accessor: "finished"
              },
              {
                Header: <span style={{ color: "white" }}>Category</span>,
                accessor: "category"
              }
            ],
            []
          )}
          data={todos}            
          loading={false}
          enablePagination={true}
        />
      </div>
    </>
    
  )
}

const styles = {
  container: { width: 400, margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20 },
  table: {width: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20},
  todo: {  marginBottom: 15 },
  input: { border: 'none', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18 },
  selectfield: {border: 'none', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18},
  todoName: { fontSize: 20, fontWeight: 'bold' },
  todoDescription: { marginBottom: 0 },
  button: { backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 18, padding: '12px', margin:'12px' },
  heading: { marginLeft: '12px', marginRight:'12px', marginTop:'12px'},
  header: { textAlign: 'right'}
}

export default withAuthenticator(App)
// export default App