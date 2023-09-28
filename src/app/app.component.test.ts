import { MockDataService } from "./mock-data.service"
import { AppComponent } from "./app.component"

describe("App Component", () => {
  it("should run test", () => {
    const mockMockDataService = {
      getCharacters: (str: string) => str
    } as unknown as MockDataService

    const appComponent = new AppComponent(mockMockDataService)

    const inputEvent = {
      target: {
        value: "testStr",
      }
    }

    appComponent.changeCharactersInput(inputEvent)


  })
})