node {
  // Mark the code checkout 'stage'....
  stage ('commit - Checkout') {
    // Get code from a scm repository
    checkout scm
  }
  // Mark the code build 'stage'....
  stage('Building BlueOcean Sample Plugin') {
    sh "mvn clean install -B -DskipTests -Dorg.slf4j.simpleLogger.log.org.apache.maven.cli.transfer.Slf4jMavenTransferListener=warn -Dmaven.test.failure.ignore -Dmaven.artifact.threads=30"
    archive '*/target/*.hpi'

    // archiveArtifacts '*/website-build/'

  }
  stage ('smoke') {
    echo 'Test whether you can start it'
    publishHTML([allowMissing: false, alwaysLinkToLastBuild: true, keepAll: false, reportDir: 'target/website-build/', reportFiles: 'index.html', reportName: 'HTML Report', reportTitles: ''])
  }
}
//script-src 'self' https://* moz-extension: blob: filesystem: 'unsafe-eval' 'unsafe-inline'; object-src 'self' https://* moz-extension: blob: filesystem:;
//
