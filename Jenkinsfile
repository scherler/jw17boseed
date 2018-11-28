node {
  // Mark the code checkout 'stage'....
  stage ('commit - Checkout') {
    // Get code from a scm repository
    checkout scm
  }
  // Mark the code build 'stage'....
  stage('Building BlueOcean Sample Plugin') {
    sh "mvn clean install -P website-execution -B -Dorg.slf4j.simpleLogger.log.org.apache.maven.cli.transfer.Slf4jMavenTransferListener=warn -Dmaven.test.failure.ignore -Dmaven.artifact.threads=30"
    archiveArtifacts 'target/*.hpi'
    archiveArtifacts 'target/website-build/'

  }
  // Mark the code build 'stage'....
  stage('Testing BlueOcean Sample Plugin') {
    echo 'sh "mvn test -Dorg.slf4j.simpleLogger.log.org.apache.maven.cli.transfer.Slf4jMavenTransferListener=warn -Dmaven.artifact.threads=30"'
  }
  stage ('Building docker image') {
    // Build Docker file, run it and smoke test it
    echo 'docker.build(\'cloudbees/speed-custom-storybook\')'
  }
  stage ('smoke') {
    echo 'Test whether you can start it'
  }
}
