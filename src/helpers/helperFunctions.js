export function validDateForm(form) {
  if (!form.jobTitle) {
    return "You must type in a job name.";
  }
  if (!form.companyName) {
    return "You must type in a company name.";
  }
  if (!form.location) {
    return "You must type in location.";
  }
  if (!form.description) {
    return "You must type in description.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.employerEmailContact)) {
    return "You must type in an valid email";
  }
  return null;
}


export default function getImage(companyImage) {
  if (!companyImage) {
    return "https://brandyourself.com/blog/wp-content/uploads/linkedin-profile-picture-too-close.png";
    return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDkvFCLSMbUU6Bqb1m-0y3LPAQ7_Gcs-PNZw&usqp=CAU";
  }
  return companyImage;
}
