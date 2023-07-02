import { UserButton } from "@clerk/nextjs"

const SetupPage = () => {
  return (
    <div className="p-4">
      protected setup page
      <UserButton afterSignOutUrl="/"></UserButton>
    </div>
  )
}

export default SetupPage