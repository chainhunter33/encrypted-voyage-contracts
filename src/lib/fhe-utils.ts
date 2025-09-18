// FHE Encryption Utilities for Encrypted Voyage Contracts
// This module provides functions to encrypt sensitive data before sending to smart contracts

export interface EncryptedData {
  encryptedValue: string;
  proof: string;
}

export interface CargoEncryptedData {
  weight: EncryptedData;
  value: EncryptedData;
  temperature: EncryptedData;
  humidity: EncryptedData;
  securityLevel: EncryptedData;
}

export interface TrackingEncryptedData {
  latitude: EncryptedData;
  longitude: EncryptedData;
  speed: EncryptedData;
  heading: EncryptedData;
  fuelLevel: EncryptedData;
  temperature: EncryptedData;
}

/**
 * Simulates FHE encryption for demonstration purposes
 * In production, this would use actual FHE libraries like TFHE-rs
 */
export class FHEEncryption {
  private static readonly ENCRYPTION_KEY = 'fhe-encryption-key-2024';

  /**
   * Encrypt a numeric value using simulated FHE
   */
  static encryptValue(value: number): EncryptedData {
    // In production, this would use actual FHE encryption
    // For now, we simulate with base64 encoding + obfuscation
    const obfuscated = this.obfuscateValue(value);
    const encrypted = btoa(obfuscated.toString());
    const proof = this.generateProof(value, encrypted);
    
    return {
      encryptedValue: encrypted,
      proof: proof
    };
  }

  /**
   * Encrypt cargo data for blockchain storage
   */
  static encryptCargoData(data: {
    weight: number;
    value: number;
    temperature: number;
    humidity: number;
    securityLevel: number;
  }): CargoEncryptedData {
    return {
      weight: this.encryptValue(data.weight),
      value: this.encryptValue(data.value),
      temperature: this.encryptValue(data.temperature),
      humidity: this.encryptValue(data.humidity),
      securityLevel: this.encryptValue(data.securityLevel),
    };
  }

  /**
   * Encrypt tracking data for blockchain storage
   */
  static encryptTrackingData(data: {
    latitude: number;
    longitude: number;
    speed: number;
    heading: number;
    fuelLevel: number;
    temperature: number;
  }): TrackingEncryptedData {
    return {
      latitude: this.encryptValue(data.latitude),
      longitude: this.encryptValue(data.longitude),
      speed: this.encryptValue(data.speed),
      heading: this.encryptValue(data.heading),
      fuelLevel: this.encryptValue(data.fuelLevel),
      temperature: this.encryptValue(data.temperature),
    };
  }

  /**
   * Obfuscate a value for demonstration
   * In production, this would be replaced with actual FHE encryption
   */
  private static obfuscateValue(value: number): number {
    // Simple obfuscation for demo purposes
    const key = this.ENCRYPTION_KEY.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return (value * 1000 + key) % 1000000;
  }

  /**
   * Generate a proof for the encrypted value
   * In production, this would be a cryptographic proof
   */
  private static generateProof(originalValue: number, encryptedValue: string): string {
    const timestamp = Date.now();
    const proofData = `${originalValue}-${encryptedValue}-${timestamp}-${this.ENCRYPTION_KEY}`;
    return btoa(proofData);
  }

  /**
   * Verify an encrypted value (for demonstration)
   * In production, this would use FHE decryption
   */
  static verifyEncryptedValue(encryptedData: EncryptedData, expectedValue: number): boolean {
    try {
      const decrypted = atob(encryptedData.encryptedValue);
      const proofData = atob(encryptedData.proof);
      return proofData.includes(expectedValue.toString());
    } catch {
      return false;
    }
  }

  /**
   * Decrypt a value (for demonstration)
   * In production, this would use FHE decryption with proper keys
   */
  static decryptValue(encryptedData: EncryptedData): number | null {
    try {
      const encrypted = atob(encryptedData.encryptedValue);
      const key = this.ENCRYPTION_KEY.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const obfuscated = parseInt(encrypted);
      return (obfuscated - key) / 1000;
    } catch {
      return null;
    }
  }
}

/**
 * Utility functions for handling encrypted data in the UI
 */
export class EncryptedDataUtils {
  /**
   * Format encrypted data for display (shows encrypted status)
   */
  static formatForDisplay(encryptedData: EncryptedData): string {
    return `🔒 Encrypted: ${encryptedData.encryptedValue.substring(0, 8)}...`;
  }

  /**
   * Check if data is properly encrypted
   */
  static isValidEncryptedData(data: EncryptedData): boolean {
    return data.encryptedValue.length > 0 && data.proof.length > 0;
  }

  /**
   * Generate a hash for encrypted data integrity
   */
  static generateDataHash(encryptedData: EncryptedData): string {
    const data = `${encryptedData.encryptedValue}-${encryptedData.proof}`;
    return btoa(data).substring(0, 16);
  }
}

/**
 * Constants for FHE operations
 */
export const FHE_CONSTANTS = {
  MAX_VALUE: 1000000,
  MIN_VALUE: 0,
  ENCRYPTION_ALGORITHM: 'FHE-TFHE',
  PROOF_LENGTH: 64,
  ENCRYPTED_DATA_LENGTH: 32,
} as const;

/**
 * Error types for FHE operations
 */
export class FHEError extends Error {
  constructor(message: string, public code: string) {
    super(message);
    this.name = 'FHEError';
  }
}

export const FHE_ERRORS = {
  INVALID_INPUT: 'FHE_INVALID_INPUT',
  ENCRYPTION_FAILED: 'FHE_ENCRYPTION_FAILED',
  DECRYPTION_FAILED: 'FHE_DECRYPTION_FAILED',
  PROOF_INVALID: 'FHE_PROOF_INVALID',
} as const;
