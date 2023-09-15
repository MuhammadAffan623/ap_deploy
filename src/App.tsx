import Hello from '~/components/Hello/Hello'
import Button from '~/components/Button/Button'

const App = () => {
  return (
    <div className='app'>
      <Hello />
      <Button type='primary'>Click me</Button>
    </div>
  )
}

export default App
