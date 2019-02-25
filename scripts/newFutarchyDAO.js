/**
 * ...
 */
const _ = require('lodash')
const async = require('async')
const execa = require('execa')
const readDeployConfig = require('./deployConfig/readDeployConfig')

const FEE = 20
const TRADING_PERIOD = 60 * 60 * 24 * 7
const TIME_TO_PRICE_RESOLUTION = TRADING_PERIOD * 2
const MARKET_FUND_AMOUNT = 10 * 10 ** 18

const environment = process.argv[2]

// TODO: get these from arapp.json, based on environment
const network = 'rinkeby'
const appName = 'futarchy.open.aragonpm.eth'

const cfg = readDeployConfig(network)

const {
  MiniMeToken: miniMeTokenAddress,
  FutarchyOracleFactory: futarchyOracleFactoryAddress,
  CentralizedTimedOracleFactory: centralizedTimedOracleFactoryAddress,
  LMSRMarketMaker: lmsrMarketMakerAddress
} = cfg.dependencyContracts

async.parallel([
  async () => {
    // TMP REMOVE
    // const daoNewOutput = await runNpmScript('dao:new', [
    //   '--environment',
    //   environment
    // ])
    // const { stdout } = daoNewOutput
    // const daoAddress = daoAddressFromSTDOUT(stdout)

    // console.log('')
    
    // const daoInstallOutput = await runNpmScript('dao:install', [
    //   daoAddress,
    //   appName,
    //   '--environment',
    //   environment,
    //   '--app-init-args',
    //   FEE,
    //   TRADING_PERIOD,
    //   TIME_TO_PRICE_RESOLUTION,
    //   MARKET_FUND_AMOUNT,
    //   miniMeTokenAddress,
    //   futarchyOracleFactoryAddress,
    //   centralizedTimedOracleFactoryAddress,
    //   lmsrMarketMakerAddress
    // ])

    // TMP HARDCODE STUFF
    // await runNpmScript('dao:acl:create', [
    //   '0x3424D074887D7a6913cA1d3a9a282e474eFd04e0',
    //   '0xcE7e08dDC064e81c668189844Dcc43eA27D11E85',
    //   'APP_MANAGER_ROLE',
    //   '0x051401D1824ba49B0370736fC9d87f78Ee6F27C7',
    //   '0x051401D1824ba49B0370736fC9d87f78Ee6F27C7',
    //   '--environment',
    //   environment,
    // ])
    await runNpmScript('dao:acl:create', [
      '0x3424D074887D7a6913cA1d3a9a282e474eFd04e0',
      '0xcE7e08dDC064e81c668189844Dcc43eA27D11E85',
      'CREATE_PERMISSIONS_ROLE',
      '0x051401D1824ba49B0370736fC9d87f78Ee6F27C7',
      '0x051401D1824ba49B0370736fC9d87f78Ee6F27C7',
      '--environment',
      environment,
    ])
    

  }
], (err) => {
  if (!err) {
    console.log('')
    console.log('Publish complete')
    console.log('')
  } else {
    console.log('Error in scripts/publish.js: ', err)
  }
})

function runNpmScript (scriptName, args = []) {
  if (args.length > 0) args.unshift('--')
  const cmdArgs = _.concat(['run', scriptName], args)
  console.log(`npm ${cmdArgs.join(' ')}`)
  console.log('')
  const run = execa('npm', cmdArgs)
  run.stdout.pipe(process.stdout)
  return run
}

function daoAddressFromSTDOUT (stdout) {
  const key = 'Created DAO: '
  const addrLen = 42
  return stdout.substr(stdout.indexOf(key) + key.length, addrLen)
}
