export default class BlockDownloader {
    constructor(core) {
      this.core = core;
      this.isRunning = true;
      this.downloadedBlocks = [];
      this.totalBlocks;
      this.progress = 0;
      this.chunkSize = 1_000;
    }
    setIsRunning(flag) {
      this.isRunning = flag;
    }
    // Method to dynamically calculate total downloaded size
    calculateTotalDownloadedSize() {
      return this.downloadedBlocks.reduce((acc, [start, end]) => acc + (end - start), 0);
    }
    async startRangeDownload() {
      console.log("Starting random chunk download. Core length:", this.core.length);
      this.totalBlocks = this.core.length;
  
      while (this.isRunning && this.progress < 95) {
        let start = this.getRandomBlockStart(this.core.length);
        let end = Math.min(start + this.chunkSize, this.core.length);
  
        [start, end] = this.findNonOverlappingRange(start, end);
  
        if (start < end) {
          this.downloadedBlocks.push([start, end]);
          
          const range = this.core.download({ start: start, end: end });
          await range.done();
          console.log("☑ Downloaded chunk from:", start, "to", end);
          
          // Dynamically calculate total downloaded size
          const totalDownloadedSize = this.calculateTotalDownloadedSize();
          // Update progress
          this.progress = (totalDownloadedSize / this.totalBlocks) * 100;
          console.log(`Progress: ${this.progress}%`);
  
          await this.sleep(1000);
        }
      }
    }
    findNonOverlappingRange(start, end) {
      for (let [downloadedStart, downloadedEnd] of this.downloadedBlocks) {
        if (start < downloadedEnd && end > downloadedStart) {
          start = downloadedEnd;
        }
      }
      return [start, end];
    }
    getRandomBlockStart(coreLength) {
      const biasFactor = 1.5;
      let weightedIndex = Math.pow(Math.random(), biasFactor) * coreLength;
      return Math.floor(weightedIndex);
    }
    async sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
  }
  