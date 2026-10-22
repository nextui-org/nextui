"use client";

import {
  Button,
  EmptyState,
  Label,
  ListBox,
  ListLayout,
  SearchField,
  Sheet,
  Virtualizer,
} from "@heroui/react";
import {Icon} from "@iconify/react";
import {useMemo, useState} from "react";

const PROFESSIONS = [
  "Accountants and Auditors",
  "Actors",
  "Actuaries",
  "Administrative Services Managers",
  "Advertising and Promotions Managers",
  "Advertising Sales Agents",
  "Aerospace Engineers",
  "Agricultural Engineers",
  "Air Traffic Controllers",
  "Aircraft Mechanics and Service Technicians",
  "Ambulance Drivers and Attendants",
  "Anesthesiologists",
  "Animal Control Workers",
  "Animators",
  "Arbitrators, Mediators, and Conciliators",
  "Architects, Except Landscape and Naval",
  "Architectural and Engineering Managers",
  "Archivists",
  "Art Directors",
  "Athletic Trainers",
  "Atmospheric and Space Scientists",
  "Audiologists",
  "Automotive Body and Related Repairers",
  "Automotive Service Technicians and Mechanics",
  "Baggage Porters and Bellhops",
  "Bakers",
  "Barbers",
  "Bartenders",
  "Bicycle Repairers",
  "Billing and Posting Clerks",
  "Biochemists and Biophysicists",
  "Biomedical Engineers",
  "Bookkeeping, Accounting, and Auditing Clerks",
  "Brickmasons and Blockmasons",
  "Broadcast Technicians",
  "Budget Analysts",
  "Bus Drivers",
  "Business Operations Specialists",
  "Butchers and Meat Cutters",
  "Cabinetmakers and Bench Carpenters",
  "Camera Operators, Television, Video, and Film",
  "Cardiovascular Technologists and Technicians",
  "Cargo and Freight Agents",
  "Carpenters",
  "Cashiers",
  "Cement Masons and Concrete Finishers",
  "Chefs and Head Cooks",
  "Chemical Engineers",
  "Chemists",
  "Chief Executives",
  "Child, Family, and School Social Workers",
  "Chiropractors",
  "Civil Engineers",
  "Claims Adjusters, Examiners, and Investigators",
  "Clinical Laboratory Technologists and Technicians",
  "Coaches and Scouts",
  "Commercial Pilots",
  "Community Health Workers",
  "Compensation and Benefits Managers",
  "Computer and Information Systems Managers",
  "Computer Hardware Engineers",
  "Computer Network Architects",
  "Computer Programmers",
  "Computer Systems Analysts",
  "Conservation Scientists",
  "Construction Laborers",
  "Construction Managers",
  "Correctional Officers and Jailers",
  "Cost Estimators",
  "Counselors",
  "Court Reporters and Simultaneous Captioners",
  "Credit Analysts",
  "Curators",
  "Customer Service Representatives",
  "Cybersecurity Analysts",
  "Data Scientists",
  "Database Administrators",
  "Dental Assistants",
  "Dental Hygienists",
  "Dentists",
  "Detectives and Criminal Investigators",
  "Diagnostic Medical Sonographers",
  "Dietitians and Nutritionists",
  "Directors, Religious Activities and Education",
  "Disc Jockeys",
  "Dispatchers",
  "Economists",
  "Editors",
  "Education Administrators",
  "Electrical Engineers",
  "Electricians",
  "Elementary School Teachers",
  "Emergency Management Directors",
  "Emergency Medical Technicians and Paramedics",
  "Environmental Engineers",
  "Environmental Scientists and Specialists",
  "Epidemiologists",
  "Event Planners",
  "Exercise Physiologists",
  "Fashion Designers",
  "Film and Video Editors",
  "Financial Analysts",
  "Financial Examiners",
  "Financial Managers",
  "Fire Inspectors and Investigators",
  "Firefighters",
  "Fitness Trainers and Aerobics Instructors",
  "Flight Attendants",
  "Floral Designers",
  "Food Scientists and Technologists",
  "Forensic Science Technicians",
  "Fundraisers",
  "Funeral Attendants",
  "General and Operations Managers",
  "Genetic Counselors",
  "Geographers",
  "Geoscientists",
  "Glaziers",
  "Graphic Designers",
  "Hairdressers, Hairstylists, and Cosmetologists",
  "Health and Safety Engineers",
  "Healthcare Social Workers",
  "Heating, Air Conditioning, and Refrigeration Mechanics",
  "High School Teachers",
  "Historians",
  "Home Health and Personal Care Aides",
  "Human Resources Managers",
  "Human Resources Specialists",
  "Hydrologists",
  "Industrial Designers",
  "Industrial Engineers",
  "Industrial Machinery Mechanics",
  "Information Security Analysts",
  "Insurance Appraisers",
  "Insurance Sales Agents",
  "Insurance Underwriters",
  "Interior Designers",
  "Interpreters and Translators",
  "Janitors and Cleaners",
  "Jewelers and Precious Stone Workers",
  "Journalists",
  "Judges and Magistrates",
  "Kindergarten Teachers",
  "Landscape Architects",
  "Lawyers",
  "Librarians and Media Collections Specialists",
  "Licensed Practical Nurses",
  "Loan Officers",
  "Locksmiths and Safe Repairers",
  "Logisticians",
  "Machine Learning Engineers",
  "Machinists",
  "Maids and Housekeeping Cleaners",
  "Management Analysts",
  "Marine Engineers and Naval Architects",
  "Market Research Analysts",
  "Marketing Managers",
  "Marriage and Family Therapists",
  "Massage Therapists",
  "Mathematicians",
  "Mechanical Engineers",
  "Medical Assistants",
  "Medical Records Specialists",
  "Medical Scientists",
  "Microbiologists",
  "Middle School Teachers",
  "Millwrights",
  "Mining and Geological Engineers",
  "Music Directors and Composers",
  "Musicians and Singers",
  "Network and Computer Systems Administrators",
  "Nuclear Engineers",
  "Nurse Anesthetists",
  "Nurse Practitioners",
  "Nursing Assistants",
  "Occupational Health and Safety Specialists",
  "Occupational Therapists",
  "Opticians, Dispensing",
  "Optometrists",
  "Orthodontists",
  "Paralegals and Legal Assistants",
  "Parking Enforcement Workers",
  "Pathologists",
  "Pediatricians",
  "Personal Financial Advisors",
  "Pest Control Workers",
  "Pharmacists",
  "Pharmacy Technicians",
  "Phlebotomists",
  "Photographers",
  "Physical Therapist Assistants",
  "Physical Therapists",
  "Physician Assistants",
  "Physicians and Surgeons",
  "Physicists",
  "Pipefitters and Steamfitters",
  "Plumbers",
  "Podiatrists",
  "Police Officers",
  "Political Scientists",
  "Postal Service Mail Carriers",
  "Postsecondary Teachers",
  "Preschool Teachers",
  "Private Detectives and Investigators",
  "Probation Officers",
  "Producers and Directors",
  "Product Managers",
  "Property Managers",
  "Prosthodontists",
  "Psychiatric Technicians",
  "Psychiatrists",
  "Psychologists",
  "Public Relations Managers",
  "Public Relations Specialists",
  "Purchasing Managers",
  "Radiation Therapists",
  "Radiologic Technologists and Technicians",
  "Real Estate Agents and Brokers",
  "Receptionists and Information Clerks",
  "Recreation Workers",
  "Recreational Therapists",
  "Registered Nurses",
  "Rehabilitation Counselors",
  "Reporters and Correspondents",
  "Respiratory Therapists",
  "Restaurant Cooks",
  "Roofers",
  "Sales Engineers",
  "Sales Managers",
  "School Bus Drivers",
  "School Psychologists",
  "Security Guards",
  "Sheet Metal Workers",
  "Sheriffs and Deputy Sheriffs",
  "Skincare Specialists",
  "Social and Community Service Managers",
  "Social Workers",
  "Software Developers",
  "Software Quality Assurance Analysts",
  "Sound Engineering Technicians",
  "Special Education Teachers",
  "Speech-Language Pathologists",
  "Statisticians",
  "Structural Iron and Steel Workers",
  "Substance Abuse Counselors",
  "Surgeons",
  "Survey Researchers",
  "Surveyors",
  "Tax Examiners and Collectors",
  "Tax Preparers",
  "Taxi Drivers and Chauffeurs",
  "Technical Writers",
  "Telecommunications Equipment Installers",
  "Tellers",
  "Training and Development Managers",
  "Training and Development Specialists",
  "Travel Agents",
  "Urban and Regional Planners",
  "UX Designers",
  "Veterinarians",
  "Veterinary Technologists and Technicians",
  "Waiters and Waitresses",
  "Water Treatment Plant Operators",
  "Web Developers",
  "Welders, Cutters, Solderers, and Brazers",
  "Writers and Authors",
  "Zoologists and Wildlife Biologists",
].map((name, i) => ({id: i, name}));

const professionSheetSnaps = ["355px"];

export function ProfessionsPicker() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!search) return PROFESSIONS;
    const q = search.toLowerCase();

    return PROFESSIONS.filter((p) => p.name.toLowerCase().includes(q));
  }, [search]);

  return (
    <div className="flex flex-col items-center gap-3">
      <Sheet
        isOpen={isOpen}
        snapPoints={professionSheetSnaps}
        onOpenChange={(open) => {
          setIsOpen(open);
          if (!open) setSearch("");
        }}
      >
        <Sheet.Trigger>
          <Button variant="secondary">Choose Occupation</Button>
        </Sheet.Trigger>
        <Sheet.Backdrop>
          <Sheet.Content className="mx-auto max-h-[95vh] max-w-[420px]">
            <Sheet.Dialog aria-label="Choose Occupation">
              <Sheet.Handle />
              <Sheet.Body className="flex min-h-0 flex-col gap-0 overflow-hidden p-0">
                <div className="px-4 pt-1 pb-2">
                  <SearchField
                    aria-label="Search occupations"
                    value={search}
                    variant="secondary"
                    onChange={setSearch}
                  >
                    <SearchField.Group>
                      <SearchField.SearchIcon />
                      <SearchField.Input placeholder="Search" />
                      <SearchField.ClearButton />
                    </SearchField.Group>
                  </SearchField>
                </div>
                {filtered.length === 0 ? (
                  <EmptyState className="flex min-h-32 flex-1 flex-col items-center justify-center gap-2">
                    <Icon className="size-5 text-muted" icon="gravity-ui:magnifier" />
                    <p className="text-sm text-muted">No occupations found.</p>
                  </EmptyState>
                ) : (
                  <Virtualizer layout={ListLayout} layoutOptions={{padding: 12, rowHeight: 36}}>
                    <ListBox
                      aria-label="Occupations"
                      className="min-h-0 flex-1 overflow-y-auto p-0"
                      items={filtered}
                      selectionMode="single"
                      onAction={(key) => {
                        const prof = PROFESSIONS.find((p) => p.id === Number(key));

                        if (prof) {
                          setSelected(prof.name);
                          setIsOpen(false);
                        }
                      }}
                    >
                      {(item) => (
                        <ListBox.Item id={item.id} textValue={item.name}>
                          <Label>{item.name}</Label>
                        </ListBox.Item>
                      )}
                    </ListBox>
                  </Virtualizer>
                )}
              </Sheet.Body>
            </Sheet.Dialog>
          </Sheet.Content>
        </Sheet.Backdrop>
      </Sheet>
      <p className="text-sm text-muted">
        Selected: <span className="font-medium text-foreground">{selected}</span>
      </p>
    </div>
  );
}
