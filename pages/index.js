
import HeadInfo from '../components/Head/Head'
import Hero from '../components/Hero/Hero'

export default function Home() {
  return (
    <>
      <HeadInfo title={'Task Tracker App'} description={'A Task tracker app for your daily task'} keywords={'task tracker, task application, online task, todo app'} />
      <Hero />
    </>
  )
}
