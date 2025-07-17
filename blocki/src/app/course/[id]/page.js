import CoursePage from '../../../pages/CoursePage';

export default async function Course({ params }) {
  return <CoursePage courseId={params.id} />;
}