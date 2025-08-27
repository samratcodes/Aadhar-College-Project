import Sidebar from '@/app/components/agencyComponents/Sidebar'

const layout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-4">{children}</div>
    </div>
  )
}

export default layout
