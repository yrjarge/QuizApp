import axios from "axios";

const fetchCategories = async (query) => {
  try {
    const response = await axios.get(`https://opentdb.com/api_category.php`);
    let category_obj_list = response.data.trivia_categories;
    let category_dict = {};
    category_obj_list.forEach((cat) => {
      category_dict[cat.name] = cat.id;
    });
    return category_dict;
  } catch (error) {
    const response = error;
    return response;
  }
};

export default fetchCategories;
