import { useState, useCallback, useRef } from "react";
import { User, Phone, Mail, Home,Eye, HeartPulse, FileText, ChevronLeft, ChevronRight, AlertTriangle, Upload } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";


const Input = ({ label, name, type = "text", icon: Icon, value, onChange }) => {
  return (
    <div className="mb-4 flex items-center bg-white shadow rounded-lg border border-[#66D2CE] p-3">
      <Icon className="text-[#66D2CE] w-5 h-5 mx-3" />
      <input
        name={name}
        type={type}
        placeholder={label}
        onChange={onChange}
        value={value}
        className="w-full p-2 focus:outline-none"
      />
    </div>
  );
};

const Dropdown = ({ label, name, options, value, onChange, icon: Icon }) => {
  return (
    <div className="mb-4 flex items-center bg-white shadow rounded-lg border border-[#66D2CE] p-3">
      <Icon className="text-[#66D2CE] w-5 h-5 mx-3" />
      <select name={name} value={value} onChange={onChange} className="w-full p-2 focus:outline-none">
        <option value="">{label}</option>
        {options.map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
};


const Button = ({ children, onClick, className = "" }) => 
{

  return (
    <button
    onClick={onClick}
    className={`px-4 py-2 text-white bg-[#66D2CE] rounded hover:bg-[#4ab7b3] transition duration-200 flex items-center justify-center ${className}`}
  >
    {children}
  </button>
  );
 
};


const PatientRegistration = () => {
  const [submitCount, setSubmitCount] = useState(0);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    gender: "",
    bloodGroup: "",
    maritalStatus: "",
    phone: "",
    email: "",
    password: "",
    address: "",
    emergencyContactName: "",
    emergencyContactRelation: "",
    emergencyContactNumber: "",
    medicalConditions: "",
    pastSurgeries: "",
    medications: "",
    allergies: "",
    disabilities: "",
  });

  const [medicalReportFile, setMedicalReportFile] = useState(null); // Store selected file

  const formDataRef = useRef(formData);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    formDataRef.current = { ...formDataRef.current, [name]: value };
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleFileUpload = (e) => {
    setMedicalReportFile([...e.target.files]); // Store all selected files in state
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (step === 4 && submitCount === 1) {
      if (Object.values(formData).every((field) => field.trim() !== "")) {
        const data = new FormData();

        // Append all form fields
        for (let key in formData) {
          data.append(key, formData[key]);
        }

        // Append file if available
        if (medicalReportFile) {
          data.append("medicalReport", medicalReportFile);
        }

        
      

   setSubmitCount();

   toast.success("Registration Successful",{position: "top-right" });
  
      }else {
        toast.error("Please fill in all fields!", { position: "top-right" });
        // alert("Please fill in all fields before submitting.");
      }
      
  };
  
}


  return (
    <>
    <div className="h-screen bg-[#a9e9e6] flex justify-center items-center " >
    <div className="h-auto w-full bg-[#a9e9e6] bg-opacity-90 flex  items-center justify-center">
      <div className="p-8 max-w-xl mx-auto bg-white shadow-lg rounded-xl border border-[#66D2CE]">
        <h2 className="text-2xl font-bold text-[#66D2CE] mb-6 flex items-center justify-center">
          <HeartPulse className="w-6 h-6 mr-2" />
          Patient Registration
        </h2>

 
        <div className="flex justify-between mb-6 gap-2">
        {[
          { name: "Personal", icon: User },
          { name: "Contact", icon: Phone },
          { name: "Emergency", icon: HeartPulse },
          { name: "Medical", icon: FileText },
        ].map((sec, index) => (
          <Button
          key={index}
          onClick={() => setStep(index + 1)}
          className={`px-3 py-1 text-sm rounded-md transition-all duration-300 ${
            step === index + 1 ? "bg-[#008080] text-white" : "bg-[#66D2CE] text-gray-700 "
          }`}
          >
            <sec.icon className="w-4 h-4 mr-1" />
            {sec.name}
          </Button>
        ))}
      </div>


        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <>
              {/* <h3 className="text-lg font-semibold text-gray-700 mb-4">Personal Information</h3> */}
              <Input label="Full Name" name="fullName" icon={User} value={formData.fullName} onChange={handleChange} />
              <Input label="Date of Birth" name="dob" type="date" icon={User} value={formData.dob} onChange={handleChange} />
              <Dropdown label="Gender" name="gender" options={["Male", "Female", "Other"]} icon={User} value={formData.gender} onChange={handleChange} />
              <Dropdown label="Blood Group" name="bloodGroup" options={["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]} icon={HeartPulse} value={formData.bloodGroup} onChange={handleChange} />
              <Dropdown label="Marital Status" name="maritalStatus" options={["Single", "Married", "Divorced", "Widowed"]} icon={User} value={formData.maritalStatus} onChange={handleChange} />
            </>
          )}

          {step === 2 && (
            <>
              {/* <h3 className="text-lg font-semibold text-gray-700 mb-4">Contact Details</h3> */}
              <Input label="Phone Number" name="phone" type="tel" icon={Phone} value={formData.phone} onChange={handleChange} />
              <Input label="Email Address" name="email" type="email" icon={Mail} value={formData.email} onChange={handleChange} />
              <Input label="Password" name="password" type="password" icon={Eye} value={formData.password} onChange={handleChange} />
              <Input label="Address" name="address" icon={Home} value={formData.address} onChange={handleChange} />
            </>
          )}

          {step === 3 && (
            <>
              {/* <h3 className="text-lg font-semibold text-gray-700 mb-4">Emergency Contact</h3> */}
              <Input label="Emergency Contact Name" name="emergencyContactName" icon={User} value={formData.emergencyContactName} onChange={handleChange} />
              <Dropdown label="Relation" name="emergencyContactRelation" options={["Parent", "Sibling", "Spouse", "Friend", "Other"]} icon={User} value={formData.emergencyContactRelation} onChange={handleChange} />
              <Input label="Emergency Contact Number" name="emergencyContactNumber" type="tel" icon={Phone} value={formData.emergencyContactNumber} onChange={handleChange} />
            </>
          )}

          {step === 4 && (
            <>
              {/* <h3 className="text-lg font-semibold text-gray-700 mb-4">Medical History</h3> */}
              <div className="grid grid-cols-2 gap-2">
              <Input label="Medical Conditions" name="medicalConditions" icon={FileText} value={formData.medicalConditions} onChange={handleChange} />
              <Input label="Past Surgeries" name="pastSurgeries" icon={FileText} value={formData.pastSurgeries} onChange={handleChange} />
              <Input label="Medications" name="medications" icon={FileText} value={formData.medications} onChange={handleChange} />
              <Input label="Allergies" name="allergies" icon={AlertTriangle} value={formData.allergies} onChange={handleChange} />
              <Input label="Disabilities" name="disabilities" icon={AlertTriangle} value={formData.disabilities} onChange={handleChange} />
              
              <div className="mb-4 flex items-center bg-white  rounded-lg border border-[#66D2CE] p-2">
             
              <label 
                  htmlFor="medicalReports" 
                  className="cursor-pointer bg-white  py-2 rounded-md flex items-center  "
                >
                  <FileText className="text-[#66D2CE] w-5 h-5 mx-3" />
                  <span className={`w-full p-2 focus:outline-none  ${medicalReportFile && medicalReportFile.length>0? "text-black":"text-gray-500"}`}>{medicalReportFile&&medicalReportFile.length > 0 
                    ? medicalReportFile.map((file) => file.name).join(", ") 
                    : "Upload Previous Reports"}
                  </span>
              </label>
  
              <input
              
                id="medicalReports"
                type="file" 
                name="medicalReports" 
                accept=".pdf,.jpg,.png" 
                className="hidden" 
                multiple
                onChange={handleFileUpload} 
              />
              </div>

              </div>
            </>
          )}

          <div className="flex justify-between mt-6">
            {step > 1 && (
              <button 
                type="button" 
                onClick={() => setStep(step - 1)} 
                className="px-5 py-2 text-white bg-[#66D2CE] rounded-lg hover:bg-[#4ab7b3] flex items-center">
                <ChevronLeft className="w-4 h-4 mr-2" /> Previous
              </button>
            )}

              {step < 4 ? (
                <button 
                  type="button" 
                  onClick={() => setStep(step + 1)} 
                  className="px-5 py-2 text-white bg-[#66D2CE] rounded-lg hover:bg-[#4ab7b3] flex items-center">
                  Next <ChevronRight className="w-4 h-4 ml-2" />
                </button>
              ) : (
                <button 
                  type="submit" 
                  onClick={()=>setSubmitCount(1)}
                  className="px-6 py-2 text-white bg-[#66D2CE] rounded-lg hover:bg-[#4ab7b3]">
                  Submit
                </button>
              )}
            </div>

        </form>
      </div>
    </div>
    </div>
    <ToastContainer/>
   </>
  );
};

export default PatientRegistration;
