import { useSelector } from 'react-redux'

const Notification = () => {

  const notification = useSelector(state => state.notification)
  console.log(notification)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginTop: 20,
    marginBottom: 30
  }
  
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification