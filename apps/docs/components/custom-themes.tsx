import {title, subtitle, titleWrapper, sectionWrapper} from "@/components/primitives";

export const CustomThemes = () => {
  return (
    <section className={sectionWrapper({class: "pb-56"})}>
      <div className={titleWrapper()}>
        <h1 className={title({size: "lg"})}>Apply your own</h1>
        <div>
          <h1 className={title({color: "blue", size: "lg"})}>theming&nbsp;</h1>
          <h1 className={title({size: "lg"})}>decisions.</h1>
        </div>
      </div>
      <p className={subtitle()}>
        NextUI provides a custom TailwindCSS plugin that allows you to customize the default themes
        or create your own.
      </p>
    </section>
  );
};
