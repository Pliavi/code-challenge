const getByRef = ref => {
  return document.querySelector(`[ref='${ref}']`);
};

const setByRef = (ref, props) => {
  const el = getByRef(ref);
  for (prop in props) {
    el[prop] = props[prop];
  }
};

const createSkill = ({ name, value }) => {
  let skill = document.createElement("div");
  skill.classList = ["skill"];
  skill.innerHTML = `
    <div class="skill__name">${name}</div>
    <div class="skill__bar">
      <div class="skill__level" style="width: ${value}"></div>
    </div>
  `;

  return skill;
};

const createExpOrEdu = ({ name, date, description }) => {
  description = description
    .split("\n")
    .map(paragraph => `<p>${paragraph}</>`)
    .join("");

  const exp = document.createElement("div");
  exp.classList = ["curriculum__block"];
  exp.innerHTML = `
    <h2 class="curriculum__title">${name}</h2>
    <div class="curriculum__period">${date}</div>
    <div class="summary">
      ${description}
    </div>
  `;

  return exp;
};

const removeLoading = async () => {
  $loading = getByRef("loading");
  $loading.style.background = "transparent";
  $loading.style.color = "transparent";
  setTimeout(() => {
    $loading.style.display = "none";
    document.body.style.overflow = "visible";
  }, 500);
};

const getProfileImage = async link => {
  const res = await fetch(link);
  const type = res.headers.get("content-type");
  if (type.indexOf("image/") === "0") {
    return link;
  }
  return "./img/avatar-dev.png";
};

(async () => {
  const res = await fetch("http://www.mocky.io/v2/5a5e38f3330000b0261923a5");
  const profile = (await res.json()).profile;

  setByRef("image", {
    src: await getProfileImage(profile.image),
    alt: `${profile.name} photo`
  });
  setByRef("name", {
    textContent: profile.name
  });
  setByRef("profession", {
    textContent: profile.profession
  });
  setByRef("description", {
    textContent: profile.description
  });

  for (contactIndex in profile.contact) {
    setByRef(contactIndex, {
      textContent: profile.contact[contactIndex]
    });
  }

  const $skills = getByRef("skills");
  for (skill of profile.skills) {
    $skills.appendChild(createSkill(skill));
  }

  const $experiences = getByRef("experience");
  for (experience of profile.experience) {
    $experiences.appendChild(createExpOrEdu(experience));
  }

  const $education = getByRef("education");
  for (education of profile.education) {
    $education.appendChild(createExpOrEdu(education));
  }

  removeLoading();
})();
