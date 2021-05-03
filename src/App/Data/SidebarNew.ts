import { People, TestType, } from "../Controller";
import { PeopleInterface } from "../Controller/People/interface";
import { TestTypeInterface } from "../Controller/TestType/interface";

export const DataSidebarNew = [
  {
    title: "Nova pessoa",
    iconName: "peoples",
    form: People.getForm(),
    asyncPost: async (value: PeopleInterface) => {
      let people = new People(value);
      const retry = people.postValue();
      return retry;
    },
  },
  {
    title: "Novo tipo de teste",
    iconName: "chemical",
    form: TestType.getForm(),
    asyncPost: async (value: TestTypeInterface) => {
      let testType = new TestType(value);
      const retry = testType.postValue();
      return retry;
    },
  },
]