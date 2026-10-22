import type {Meta} from "@storybook/react";

import {Icon} from "@iconify/react";
import {useMemo, useState} from "react";
import {ListLayout, Virtualizer} from "react-aria-components/Virtualizer";

import {Button} from "../button";
import {EmptyState} from "../empty-state";
import {Input} from "../input";
import {Label} from "../label";
import {ListBox} from "../list-box";
import {SearchField} from "../search-field";
import {TextField} from "../textfield";

import {Sheet} from "./index";

export default {
  component: Sheet,
  parameters: {layout: "centered"},
  title: "Components/Overlays/Sheet",
} as Meta<typeof Sheet>;

const snapPointValues = ["148px", "355px"];

const NESTED_DIALOG_HEIGHT = "h-[320px]";

const fadeSnapPoints = ["150px", "300px", "450px"];

export function Basic() {
  return (
    <Sheet>
      <Sheet.Trigger>
        <Button variant="secondary">Open Sheet</Button>
      </Sheet.Trigger>
      <Sheet.Backdrop>
        <Sheet.Content className="mx-auto max-h-[95vh] max-w-[420px]">
          <Sheet.Dialog>
            <Sheet.Handle />
            <Sheet.CloseTrigger />
            <Sheet.Header>
              <Sheet.Heading>Sheet Title</Sheet.Heading>
            </Sheet.Header>
            <Sheet.Body>
              <p className="text-sm text-muted">
                This is a bottom sheet built with smooth drag-to-dismiss animations. Try dragging
                the handle down to close, or use the close button.
              </p>
            </Sheet.Body>
            <Sheet.Footer>
              <Sheet.Close>
                <Button variant="secondary">Cancel</Button>
              </Sheet.Close>
              <Sheet.Close>
                <Button variant="secondary">Confirm</Button>
              </Sheet.Close>
            </Sheet.Footer>
          </Sheet.Dialog>
        </Sheet.Content>
      </Sheet.Backdrop>
    </Sheet>
  );
}

export function Placements() {
  const placements = ["bottom", "top", "left", "right"] as const;

  return (
    <div className="flex flex-wrap gap-4">
      {placements.map((p) => (
        <Sheet key={p} placement={p}>
          <Sheet.Trigger>
            <Button variant="secondary">{p.charAt(0).toUpperCase() + p.slice(1)}</Button>
          </Sheet.Trigger>
          <Sheet.Backdrop variant="blur">
            <Sheet.Content className={p === "left" || p === "right" ? "w-[400px]" : undefined}>
              <Sheet.Dialog>
                <Sheet.CloseTrigger />
                {p === "bottom" && <Sheet.Handle />}
                <Sheet.Header>
                  <Sheet.Heading>{p.charAt(0).toUpperCase() + p.slice(1)} Sheet</Sheet.Heading>
                </Sheet.Header>
                <Sheet.Body>
                  <p className="text-sm text-muted">
                    This sheet slides in from the <strong>{p}</strong> edge of the screen with a
                    smooth spring-like animation.
                  </p>
                </Sheet.Body>
                <Sheet.Footer>
                  <Sheet.Close>
                    <Button variant="secondary">Cancel</Button>
                  </Sheet.Close>
                  <Sheet.Close>
                    <Button variant="secondary">Done</Button>
                  </Sheet.Close>
                </Sheet.Footer>
                {p === "top" && <Sheet.Handle />}
              </Sheet.Dialog>
            </Sheet.Content>
          </Sheet.Backdrop>
        </Sheet>
      ))}
    </div>
  );
}

export function SnapPoints() {
  return (
    <Sheet snapPoints={snapPointValues}>
      <Sheet.Trigger>
        <Button variant="secondary">Snap Points</Button>
      </Sheet.Trigger>
      <Sheet.Backdrop>
        <Sheet.Content>
          <Sheet.Dialog>
            <Sheet.Handle />
            <Sheet.Header>
              <Sheet.Heading>Snap Points</Sheet.Heading>
            </Sheet.Header>
            <Sheet.Body>
              <div className="flex flex-col gap-4">
                <p className="text-sm text-muted">
                  This sheet opens at 148px and snaps again at 355px. Dragging past the last detent
                  reveals the full sheet, and the backdrop fades in after that point.
                </p>
                {Array.from({length: 6}).map((_, i) => (
                  <p key={i} className="text-sm text-muted">
                    {i === 0
                      ? "Swipe up to reveal more content and fade the backdrop in."
                      : `More content at this level (${i + 1}).`}
                  </p>
                ))}
              </div>
            </Sheet.Body>
          </Sheet.Dialog>
        </Sheet.Content>
      </Sheet.Backdrop>
    </Sheet>
  );
}

export function SnapPointsSequential() {
  return (
    <Sheet snapPoints={snapPointValues}>
      <Sheet.Trigger>
        <Button variant="secondary">Sequential Snap Points</Button>
      </Sheet.Trigger>
      <Sheet.Backdrop>
        <Sheet.Content>
          <Sheet.Dialog>
            <Sheet.Handle />
            <Sheet.Header>
              <Sheet.Heading>Snap points</Sheet.Heading>
            </Sheet.Header>
            <Sheet.Body>
              <p className="text-sm text-muted">
                A swipe can move across several detents. Full height is the end of the gesture, so
                it is not listed as its own snap point.
              </p>
            </Sheet.Body>
          </Sheet.Dialog>
        </Sheet.Content>
      </Sheet.Backdrop>
    </Sheet>
  );
}

export function SnapPointsCustomFade() {
  return (
    <Sheet snapPoints={fadeSnapPoints}>
      <Sheet.Trigger>
        <Button variant="secondary">Custom Fade Index</Button>
      </Sheet.Trigger>
      <Sheet.Backdrop>
        <Sheet.Content>
          <Sheet.Dialog>
            <Sheet.Handle />
            <Sheet.Header>
              <Sheet.Heading>Backdrop fade</Sheet.Heading>
            </Sheet.Header>
            <Sheet.Body>
              <p className="text-sm text-muted">
                The backdrop stays clear through the snap points and fades in only after the last
                detent, as the sheet opens to its full height.
              </p>
            </Sheet.Body>
          </Sheet.Dialog>
        </Sheet.Content>
      </Sheet.Backdrop>
    </Sheet>
  );
}

export function BackdropVariants() {
  const variants = ["opaque", "blur", "transparent"] as const;

  return (
    <div className="flex flex-wrap gap-4">
      {variants.map((v) => (
        <Sheet key={v}>
          <Sheet.Trigger>
            <Button variant="secondary">{v.charAt(0).toUpperCase() + v.slice(1)}</Button>
          </Sheet.Trigger>
          <Sheet.Backdrop variant={v}>
            <Sheet.Content className="mx-auto max-h-[95vh] max-w-[420px]">
              <Sheet.Dialog>
                <Sheet.Handle />
                <Sheet.CloseTrigger />
                <Sheet.Header>
                  <Sheet.Heading>Backdrop: {v.charAt(0).toUpperCase() + v.slice(1)}</Sheet.Heading>
                </Sheet.Header>
                <Sheet.Body>
                  <p className="text-sm text-muted">
                    This sheet uses the <code className="text-foreground">{v}</code> backdrop
                    variant.
                  </p>
                </Sheet.Body>
                <Sheet.Footer>
                  <Sheet.Close>
                    <Button className="w-full">Close</Button>
                  </Sheet.Close>
                </Sheet.Footer>
              </Sheet.Dialog>
            </Sheet.Content>
          </Sheet.Backdrop>
        </Sheet>
      ))}
    </div>
  );
}

export function NonDismissable() {
  return (
    <Sheet isDismissable={false}>
      <Sheet.Trigger>
        <Button variant="secondary">Important Action</Button>
      </Sheet.Trigger>
      <Sheet.Backdrop>
        <Sheet.Content className="mx-auto max-w-[420px]">
          <Sheet.Dialog>
            <Sheet.Header>
              <Sheet.Heading>Confirm Action</Sheet.Heading>
            </Sheet.Header>
            <Sheet.Body>
              <p className="text-sm text-muted">
                This sheet cannot be dismissed by clicking outside or dragging. You must use one of
                the buttons below.
              </p>
            </Sheet.Body>
            <Sheet.Footer>
              <Sheet.Close>
                <Button variant="secondary">Cancel</Button>
              </Sheet.Close>
              <Sheet.Close>
                <Button variant="secondary">Confirm</Button>
              </Sheet.Close>
            </Sheet.Footer>
          </Sheet.Dialog>
        </Sheet.Content>
      </Sheet.Backdrop>
    </Sheet>
  );
}

export function ScrollableContent() {
  return (
    <Sheet>
      <Sheet.Trigger>
        <Button variant="secondary">Terms &amp; Conditions</Button>
      </Sheet.Trigger>
      <Sheet.Backdrop>
        <Sheet.Content className="mx-auto max-h-[95vh] max-w-[420px]">
          <Sheet.Dialog>
            <Sheet.Handle />
            <Sheet.CloseTrigger />
            <Sheet.Header>
              <Sheet.Heading>Terms &amp; Conditions</Sheet.Heading>
            </Sheet.Header>
            <Sheet.Body>
              {Array.from({length: 20}).map((_, i) => (
                <p key={i} className="mb-3 text-sm text-muted">
                  Paragraph {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                  pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet hendrerit
                  risus, sed porttitor quam. Donec nec vestibulum libero.
                </p>
              ))}
            </Sheet.Body>
            <Sheet.Footer>
              <Sheet.Close>
                <Button variant="secondary">Decline</Button>
              </Sheet.Close>
              <Sheet.Close>
                <Button variant="secondary">Accept</Button>
              </Sheet.Close>
            </Sheet.Footer>
          </Sheet.Dialog>
        </Sheet.Content>
      </Sheet.Backdrop>
    </Sheet>
  );
}

export function WithForm() {
  return (
    <Sheet placement="right">
      <Sheet.Trigger>
        <Button variant="secondary">Edit Profile</Button>
      </Sheet.Trigger>
      <Sheet.Backdrop>
        <Sheet.Content className="w-[400px]">
          <Sheet.Dialog>
            <Sheet.CloseTrigger />
            <Sheet.Header>
              <Sheet.Heading>Edit Profile</Sheet.Heading>
            </Sheet.Header>
            <Sheet.Body>
              <form className="flex flex-col gap-4">
                <TextField className="w-full" name="name" type="text">
                  <Label>Name</Label>
                  <Input placeholder="Enter your name" variant="secondary" />
                </TextField>
                <TextField className="w-full" name="email" type="email">
                  <Label>Email</Label>
                  <Input placeholder="Enter your email" variant="secondary" />
                </TextField>
                <TextField className="w-full" name="bio">
                  <Label>Bio</Label>
                  <Input placeholder="Tell us about yourself" variant="secondary" />
                </TextField>
              </form>
            </Sheet.Body>
            <Sheet.Footer>
              <Sheet.Close>
                <Button variant="secondary">Cancel</Button>
              </Sheet.Close>
              <Sheet.Close>
                <Button variant="secondary">Save Changes</Button>
              </Sheet.Close>
            </Sheet.Footer>
          </Sheet.Dialog>
        </Sheet.Content>
      </Sheet.Backdrop>
    </Sheet>
  );
}

export function Detached() {
  const placements = ["bottom", "top", "left", "right"] as const;

  return (
    <div className="flex flex-wrap gap-4">
      {placements.map((p) => (
        <Sheet key={p} isDetached placement={p}>
          <Sheet.Trigger>
            <Button variant="secondary">{p.charAt(0).toUpperCase() + p.slice(1)}</Button>
          </Sheet.Trigger>
          <Sheet.Backdrop>
            <Sheet.Content
              className={p === "left" || p === "right" ? "w-[310px]" : "mx-auto max-w-[420px]"}
            >
              <Sheet.Dialog className={p === "left" || p === "right" ? "h-full" : undefined}>
                {p === "bottom" && <Sheet.Handle />}
                <Sheet.Body className="flex flex-col gap-4 py-5">
                  <Sheet.Heading>Detached {p}</Sheet.Heading>
                  <p className="text-sm text-muted">
                    The sheet floats away from the viewport edge with rounded corners on all sides.
                  </p>
                </Sheet.Body>
                {p === "top" && <Sheet.Handle />}
              </Sheet.Dialog>
            </Sheet.Content>
          </Sheet.Backdrop>
        </Sheet>
      ))}
    </div>
  );
}

export function Controlled() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col items-start gap-4">
      <div className="flex items-center gap-3">
        <Button size="sm" variant="secondary" onPress={() => setIsOpen(true)}>
          Open Sheet
        </Button>
        <Button size="sm" variant="secondary" onPress={() => setIsOpen(!isOpen)}>
          Toggle
        </Button>
        <p className="text-xs text-muted">
          Status:{" "}
          <span className="font-mono font-medium text-foreground">
            {isOpen ? "open" : "closed"}
          </span>
        </p>
      </div>

      <Sheet isOpen={isOpen} onOpenChange={setIsOpen}>
        <Sheet.Backdrop>
          <Sheet.Content className="mx-auto max-w-[420px]">
            <Sheet.Dialog>
              <Sheet.Handle />
              <Sheet.CloseTrigger />
              <Sheet.Header>
                <Sheet.Heading>Controlled Sheet</Sheet.Heading>
              </Sheet.Header>
              <Sheet.Body>
                <p className="text-sm text-muted">
                  This sheet is controlled via <code>isOpen</code> and <code>onOpenChange</code>{" "}
                  props. The parent manages the state externally.
                </p>
              </Sheet.Body>
              <Sheet.Footer>
                <Sheet.Close>
                  <Button>Close</Button>
                </Sheet.Close>
              </Sheet.Footer>
            </Sheet.Dialog>
          </Sheet.Content>
        </Sheet.Backdrop>
      </Sheet>
    </div>
  );
}

export function HandleOnly() {
  return (
    <Sheet>
      <Sheet.Trigger>
        <Button variant="secondary">Handle Only</Button>
      </Sheet.Trigger>
      <Sheet.Backdrop>
        <Sheet.Content className="mx-auto max-w-[420px]">
          <Sheet.Dialog>
            <Sheet.Handle />
            <Sheet.CloseTrigger />
            <Sheet.Header>
              <Sheet.Heading>Swipe the sheet</Sheet.Heading>
            </Sheet.Header>
            <Sheet.Body>
              <p className="text-sm text-muted">
                The handle is a visual grip. Swipe anywhere on the sheet until it is fully expanded.
                After that, the body scrolls instead of moving the sheet.
              </p>
            </Sheet.Body>
            <Sheet.Footer>
              <Sheet.Close>
                <Button variant="secondary">Done</Button>
              </Sheet.Close>
            </Sheet.Footer>
          </Sheet.Dialog>
        </Sheet.Content>
      </Sheet.Backdrop>
    </Sheet>
  );
}

export function Nested() {
  return (
    <Sheet>
      <Sheet.Trigger>
        <Button variant="secondary">Open Parent Sheet</Button>
      </Sheet.Trigger>
      <Sheet.Backdrop>
        <Sheet.Content className="mx-auto max-w-[420px]">
          <Sheet.Dialog className={NESTED_DIALOG_HEIGHT}>
            <Sheet.Handle />
            <Sheet.CloseTrigger />
            <Sheet.Header>
              <Sheet.Heading>Parent Sheet</Sheet.Heading>
            </Sheet.Header>
            <Sheet.Body className="flex flex-col justify-between pb-4">
              <p className="mb-4 text-sm text-muted">
                This is the parent sheet. Open a nested sheet from here — the parent will scale down
                and the child slides on top.
              </p>
              <Sheet.NestedRoot>
                <Sheet.Trigger>
                  <Button className="w-full" variant="secondary">
                    Open Nested Sheet
                  </Button>
                </Sheet.Trigger>
                <Sheet.Backdrop>
                  <Sheet.Content className="mx-auto max-w-[420px]">
                    <Sheet.Dialog className={NESTED_DIALOG_HEIGHT}>
                      <Sheet.Handle />
                      <Sheet.CloseTrigger />
                      <Sheet.Header>
                        <Sheet.Heading>Nested Sheet</Sheet.Heading>
                      </Sheet.Header>
                      <Sheet.Body>
                        <p className="mb-4 text-sm text-muted">
                          This is a nested sheet that sits on top of the parent. Drag it down to
                          dismiss and return to the parent sheet.
                        </p>
                        <Sheet.NestedRoot>
                          <Sheet.Trigger>
                            <Button className="w-full" variant="secondary">
                              Go Deeper
                            </Button>
                          </Sheet.Trigger>
                          <Sheet.Backdrop>
                            <Sheet.Content className="mx-auto max-w-[420px]">
                              <Sheet.Dialog className={NESTED_DIALOG_HEIGHT}>
                                <Sheet.Handle />
                                <Sheet.CloseTrigger />
                                <Sheet.Header>
                                  <Sheet.Heading>Third Level</Sheet.Heading>
                                </Sheet.Header>
                                <Sheet.Body>
                                  <p className="text-sm text-muted">
                                    Three levels deep! Each parent sheet scales down as the next one
                                    opens, creating a stacking effect.
                                  </p>
                                </Sheet.Body>
                                <Sheet.Footer>
                                  <Sheet.Close>
                                    <Button className="w-full">Close</Button>
                                  </Sheet.Close>
                                </Sheet.Footer>
                              </Sheet.Dialog>
                            </Sheet.Content>
                          </Sheet.Backdrop>
                        </Sheet.NestedRoot>
                      </Sheet.Body>
                      <Sheet.Footer>
                        <Sheet.Close>
                          <Button variant="secondary">Back</Button>
                        </Sheet.Close>
                      </Sheet.Footer>
                    </Sheet.Dialog>
                  </Sheet.Content>
                </Sheet.Backdrop>
              </Sheet.NestedRoot>
            </Sheet.Body>
          </Sheet.Dialog>
        </Sheet.Content>
      </Sheet.Backdrop>
    </Sheet>
  );
}

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

SnapPointsSequential.storyName = "Snap Points (Sequential)";
SnapPointsCustomFade.storyName = "Snap Points (Custom Fade)";
