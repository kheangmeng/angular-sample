import { computed, effect, linkedSignal, resource, Signal, signal } from "@angular/core";

export class SignalTestService {
  constructor() {
    effect((onCleanup) => {
      if(this.firstName() && this.lastName()) {
        console.log('full name:', this.fullName())
      } else  {
        console.log('no full name');
      }

      const timer = setTimeout(() => {
        console.log('check full name', this.fullName())
      })

      // --------
      // handleLinkSignal()
      // --------
      // handleSignalResource()

      onCleanup(() => {
        console.log('cleanup');
        clearTimeout(timer)
      })
    })
  }
  firstName = signal('hello')
  lastName = signal('hi')
  fullName = computed(() => `${this.firstName()} ${this.lastName()}`)
  setName(firstName: string, lastName: string) {
    this.firstName.set(firstName)
    this.lastName.set(lastName)
  }
  updateName(firstName: string, lastName: string) {
    this.firstName.update(name => `${name} ${firstName}`)
    this.lastName.update(name => `${name} ${lastName}`)
  }
  resetName() {
    this.firstName.set('')
    this.lastName.set('')
  }

// ---------------

  info = signal({
    username: '',
    email: ''
  })
  formatInfo = computed(() => `${this.info().username} - ${this.info().email}`)
  setEmail(email: string) {
    this.info.update(info => ({...info, email}))
  }
  setUsername(username: string) {
    this.info.update(info => ({...info, username}))
  }
  setInfo(username: string, email: string) {
    this.info.set({username, email})
  }
  updateInfo(username: string, email: string) {
    this.info.update(info => ({...info, username, email}))
  }

  loggingEffect = effect(() => {
    if(this.info().email) {
      console.log('EMAIL:', this.info().email);
    }
    if(this.info().username) {
      console.log('USERNAME:', this.info().username);
    }
    console.log('INFO:', this.info());
  })
}

function handleLinkSignal() {
  const dataOptions = signal(['option 1', 'option 2', 'option 3'])
  const selectedOption = linkedSignal(() => dataOptions()[0])
  // console.log(selectedOption) // option 1

  // const selectedOption = linkedSignal<DataOption[], DataOption>({
  //   source: dataOptions,
  //   computation: (newOptions, previous) => {
  //     return newOptions.find(opt => opt.id === previous?.id) ?? newOptions[0]
  //   }
  // })

  selectedOption.set(dataOptions()[2])
  // console.log(selectedOption) // option 3

  dataOptions.set(['option 21', 'option 22', 'option 23'])
  // console.log(selectedOption) // option 21
}


function handleSignalResource() {
  const dataId: Signal<string> = signal('123')

  interface UserData {
    firstName: string;
    lastName: string;
  }

  const dataSource = resource<UserData, { id: string }>({
    params: () => ({id: dataId()}),
    loader: ({params, previous, abortSignal}) => fetchData(params) as Promise<UserData>
  })
  // dataSource.reload()

  const fullName = computed(() => {
    if(dataSource.hasValue()) {
      const value = dataSource.value() as UserData;
      return value.firstName + ' ' + value.lastName;
    } else {
      return ''
    }
  })
}

function fetchData(params: any) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({})
      reject({})
    }, 1000)
  })
}
