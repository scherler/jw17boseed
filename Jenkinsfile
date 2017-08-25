node {
  // Mark the code checkout 'stage'....
  stage ('commit - Checkout') {
    // Get code from a scm repository
    checkout scm
  }
  // Mark the code build 'stage'....
  stage('Building BlueOcean Sample Plugin') {
    sh "mvn clean install -B -DcleanNode -Dorg.slf4j.simpleLogger.log.org.apache.maven.cli.transfer.Slf4jMavenTransferListener=warn -Dmaven.test.failure.ignore -s settings.xml -Dmaven.artifact.threads=30"
    junit '**/target/surefire-reports/TEST-*.xml'
    junit '**/target/jest-reports/*.xml'
    archive '*/target/*.hpi'
  }
  stage ('Building docker image') {
    // Build Docker file, run it and smoke test it
    docker.build('cloudbees/speed-custom-storybook')
  }
  stage ('smoke') {
    echo 'Test whether you can start it'
  }
}
