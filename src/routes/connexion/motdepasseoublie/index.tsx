import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/connexion/motdepasseoublie/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/connexion/motdepasseoublie/"!</div>
}
