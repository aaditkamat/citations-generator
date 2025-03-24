// import pdf from "pdf-parse";

export type CreateGraphRequestBody = {
  file: string;
};

export default class FilesService {
  public async createGraph(file: File): Promise<string> {
    console.log(file);
    // try {
    //   const data = await pdf(file);
    //   return data.text;
    // } catch (err) {
    //   console.error(err);
    //   return "";
    // }
    return Promise.resolve("Sample Graph");
  }
}
