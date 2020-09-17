import axios from "axios";

export async function fetchWithDelay(apiKey) {
  let data = [];

  await axios
    .get(`https://api.jotform.com/user/forms?apiKey=${apiKey}`)
    .then((response) => {
      let array = response.data.content;
      for (let i in array) {
        let form_element = {
          submissions: array[i].count,
          value_form_id: array[i].id,
          questions: [],
          title: array[i].title,
        };
        axios
          .get(
            `https://api.jotform.com/form/${array[i].id}/questions?apiKey=${apiKey}`
          )
          .then((response1) => {
            let questions1 = response1.data.content;

            Object.entries(questions1).map((item) => {
              if (
                item[1].type !== "control_head" &&
                item[1].type !== "control_button" &&
                item[1].type !== "control_divider" &&
                item[1].type !== "control_pagebreak"
              ) {
                form_element.questions.push(item[1]);
              }
            });
            data.push(form_element);
            return;
          })
          .catch((error) => console.error(error));
      }
    });

  return data;
}

export async function geocode(address, apikey) {
  let data = [];

  await axios
    .get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address},&key=${apikey}`
    )
    .then((response) => {
      data.push(response.data);
    })
    .catch((error) => console.error(error));
  return data[0];
}

export async function postData(data) {
  var formdata = new FormData();

  formdata.set("googleAPIKey", data.googleAPIKey);
  formdata.set("selectedMarker", data.selectedMarker);
  formdata.set("selectedStyle", data.selectedStyle);
  formdata.set("jotformAPIKey", data.jotformAPIKey);
  formdata.set("formID", data.formID);
  formdata.set("labels", data.labels);
  formdata.set("addressQuestionID", data.addressQuestionID);
  let res = await axios({
    method: "post",
    url: "https://cors-anywhere.herokuapp.com/https://jotmap2.jotform.io/maps/",
    data: formdata,
  });
  return res;
}

export async function getData(mapID) {
  let res = await axios.get(
    `https://cors-anywhere.herokuapp.com/https://jotmap2.jotform.io/maps/${mapID}`
  );
  return res;
}
