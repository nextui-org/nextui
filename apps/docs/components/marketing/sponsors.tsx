import {sectionWrapper} from "@/components/primitives";

export const Sponsors = () => {
  return (
    <section className={sectionWrapper({class: "text-center mt-24 lg:mt-56"})}>
      <h3 className="text-large text-default-500">Supported and backed by</h3>
      <h1>Sponsor 1</h1>
      <h1>Sponsor 2</h1>
      <h1>Sponsor 3</h1>
    </section>
  );
};
