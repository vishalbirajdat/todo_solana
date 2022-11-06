import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useTodo } from '../hooks/todo'
import Loading from '../components/Loading'
import TodoSection from '../components/todo/TodoSection'
import styles from '../styles/Home.module.css'
import { useState } from 'react/cjs/react.production.min'


const Home = () => {
    const { initialized, initializeUser, loading, transactionPending, completedTodos, incompleteTodos, addTodo, markTodo, removeTodo, markStaticTodo,removeStaticTodo, addStaticTodo, } = useTodo()
    const [Inputs, setInputs] = useState(null)
    const handleChange = (e)=>{
         e.preventDefault();
        console.log(e.target.value);
        setInputs(e.target.value);
    }

    const addTodoAdd = (e)=>{
        e.preventDefault();
        addTodo(Inputs);
    }

    return (
        <div className={styles.container}>
            <div className={styles.actionsContainer}>
                {initialized ? (
                    <div className={styles.todoInput}>
                        <div className={`${styles.todoCheckbox} ${styles.checked}`} />
                        <div className={styles.inputContainer}>
                            <form onSubmit={addTodoAdd}>
                                <input  onChange={handleChange} id={styles.inputField} type="text" placeholder='Create a new todo...' />
                            </form>
                        </div>
                        <div className={styles.iconContainer}>
       
                        </div>
                    </div>
                ) : (
                    <button type="button" className={styles.button} onClick={() => initializeUser()} disabled={transactionPending}>
                        Initialize
                    </button>
                )}
                <WalletMultiButton />
            </div>

            <div className={styles.mainContainer}>
                <Loading loading={loading}>
                    <TodoSection title="Tasks" todos={incompleteTodos} action={markTodo} />

                    <TodoSection title="Completed" todos={completedTodos} action={removeTodo} />
                </Loading>
            </div>
        </div>
    )
}

export default Home
