import CoursePage from '../../../components/CoursePage';

export default async function Course({ params }) {
  const { id } = await params;
  return <CoursePage courseId={id} />;
}