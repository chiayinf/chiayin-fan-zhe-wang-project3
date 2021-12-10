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
  