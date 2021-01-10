import * as chalk from 'chalk';

class Log {
  public router(method: string, path: string, prefix: string) {
    path = prefix ? `${prefix}${path}` : path;
    console.log(
      chalk.blue(`[router] ${method.toUpperCase()} - ${path}`)
    )
  }

  public request(method: string, url: string) {
    console.log(
      chalk.yellow(`[request] ${method} ${url}`)
    )
  }

  public response(method: string, url: string, time: number, status: number) {
    console.log(
      chalk.yellow(`[response] ${method} ${url} - ${time} ${status}`)
    )
  }
}

export default new Log();
